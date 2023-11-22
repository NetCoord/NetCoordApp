import { firebase, firestore } from '../../firebase'
import moment from 'moment'

const getInitialState = () => ({
  courts: {
    loading: false,
    data: []
  },
  courtAvailability: {
    loading: false,
    data: []
  },
  courtEvents: {
    loading: false,
    data: []
  },
  selectedCourt: null,
  formCreateEvent: {
    isPickUp: false,
    selectedGender: null,
    selectedSport: null,
    eventName: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    recurrence: null,
    selectedCourts: [],
    selectedCourtNumbers: {}
  },
  listeners: {
    courts: null,
    courtAvailability: null
  }
})

const state = getInitialState()

const mutations = {
  SET_VALUE (state, { name, payload }) {
    state[name] = payload
  },
  UPDATE_PROPERTY (state, { name, payload }) {
    state[name] = { ...state[name], ...payload }
  },
  RESET_STATE (state) {
    Object.keys(state.listeners).forEach(key => {
      if (state.listeners[key]) {
        state.listeners[key]()
      }
    })
    Object.assign(state, getInitialState())
  }
}

const actions = {
  async getCourts ({ commit }) {
    commit('UPDATE_PROPERTY', { name: 'courts', payload: { loading: true } })

    return new Promise((resolve, reject) => {
      const listener = firestore.collection('courts')
        .onSnapshot((snapshot) => {
          const courts = []
          snapshot.forEach((doc) => {
            const court = doc.data()
            court.id = doc.id
            if (court.updatedAt) {
              court.updatedAt = court.updatedAt.toDate()
            }
            courts.push(court)
          })
          commit('UPDATE_PROPERTY', { name: 'courts', payload: { data: courts, loading: false } })
          resolve()
        }, (error) => {
          commit('UPDATE_PROPERTY', { name: 'courts', payload: { data: [], loading: false } })
          reject(error)
        })
      commit('UPDATE_PROPERTY', {
        name: 'listeners',
        payload: { courts: listener }
      })
    })
  },
  async getCourtAvailability ({ commit }) {
    commit('UPDATE_PROPERTY', { name: 'courtAvailability', payload: { loading: true } })

    return new Promise((resolve, reject) => {
      const listener = firestore.collection('scraped_data')
        .doc('tennis_courts_data')
        .onSnapshot((doc) => {
          const courtAvailability = doc.data()
          commit('UPDATE_PROPERTY', { name: 'courtAvailability', payload: { data: courtAvailability, loading: false } })
          resolve()
        }, (error) => {
          commit('UPDATE_PROPERTY', { name: 'courtAvailability', payload: { data: [], loading: false } })
          reject(error)
        })
      commit('UPDATE_PROPERTY', {
        name: 'listeners',
        payload: { courtAvailability: listener }
      })
    })
  },
  async updateCourt (context, { id, ...payload }) {
    await firestore.collection('courts').doc(id).update({
      ...payload,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  setSelectedCourt ({ commit }, payload) {
    commit('SET_VALUE', { name: 'selectedCourt', payload })
  },
  async fetchRosters (context, filters) {
    return new Promise(async (resolve, reject) => {
      let query = firestore.collection('users')

      const { sport, gender } = filters
      if (sport) {
        query = query.where('sport', '==', sport)
      }
      if (gender && gender !== 'Mixed') {
        query = query.where('gender', '==', gender.toLowerCase() === 'men' ? 'M' : 'F')
      }

      const userSnapshot = await query.get()
      const rosters = []

      userSnapshot.forEach((doc) => {
        rosters.push({
          id: doc.id,
          ...doc.data()
        })
      })
      resolve(rosters)
    })
  },
  async createEvent ({ state }) {
    const {
      isPickUp,
      selectedGender,
      selectedSport,
      eventName,
      startDate,
      startTime,
      endDate,
      endTime,
      selectedCourtNumbers,
    } = state.formCreateEvent

    const sdate = moment(startDate)
    const stime = moment(startTime)
    sdate.hour(stime.hour()).minute(stime.minute())

    const edate = moment(endDate)
    const etime = moment(endTime)
    edate.hour(etime.hour()).minute(etime.minute())

    const courtDetails = {}
    for (const courtId of Object.keys(selectedCourtNumbers)) {
      if (!courtDetails[courtId]) {
        courtDetails[courtId] = {}
      }
      for (const courtNum of Object.keys(selectedCourtNumbers[courtId])) {
        if (!courtDetails[courtId][courtNum]) {
          courtDetails[courtId][courtNum] = {}
        }
        for (const player of selectedCourtNumbers[courtId][courtNum]) {
          courtDetails[courtId][courtNum][player.id] = 1
        }
      }
    }

    const payload = {
      isPickUp,
      gender: selectedGender,
      sport: selectedSport,
      name: eventName,
      startTime: sdate.toDate(),
      endTime: edate.toDate(),
      courtDetails,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    await firestore.collection('events').add(payload)
  },
  async fetchAllEvents (context, params) {
    return new Promise(async (resolve, reject) => {
      let query = firestore.collection('events').orderBy('startTime', 'asc')

      try {
        const eventSnapshot = await query.get()
        const events = []
  
        eventSnapshot.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data()
          })
        })
        resolve(events)
      } catch (err) {
        reject([])
      }
    })
  },
  async fetchMyEvents ({ rootState }) {
    return new Promise(async (resolve, reject) => {
      let query = firestore.collection('events')
        .where(`participants.${rootState.auth.user.uid}`, '==', true)

      try {
        const eventSnapshot = await query.get()
        const events = []
  
        eventSnapshot.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data()
          })
        })
        resolve(events)
      } catch (err) {
        reject([])
      }
    })
  },
  async fetchEvents (context, params) {
    return new Promise(async (resolve, reject) => {
      const { courtId, courtNum } = params
      let query = firestore.collection('events')
        .orderBy(`courtDetails.${courtId}.${courtNum}`)

      try {
        const eventSnapshot = await query.get()
        const events = []
  
        eventSnapshot.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data()
          })
        })
        resolve(events)
      } catch (err) {
        reject([])
      }
    })
  }
}

const getters = {
  courtWithTimes(state){
    if(!state.courtAvailability.data || !state.courts.data.length) {
      return null
    }
    const result = {}
    Object.keys(state.courtAvailability.data).forEach((tennisCourtName) => {
      const nameArr = tennisCourtName.replace('Tennis ', '').replace('Court ', '').split(' ')
      const courtNum = parseInt(nameArr.pop())
      const courtName = nameArr.join(' ')

      const court = state.courts.data.find(court => court.name.toLowerCase() === courtName.toLowerCase())
      if (court) {
        if (!(court.id in result)) {
          result[court.id] = {}
        }
        if (!(courtNum in result[court.id])) {
          result[court.id][courtNum] = []
        }
        const availabilityArr = state.courtAvailability.data[tennisCourtName].filter(avail => !!avail.available_times)
        result[court.id][courtNum] = availabilityArr
      }
    })
    return result
  },
  courtIdToName (state) {
    if(!state.courts.data.length) {
      return {}
    }

    const hash = {}
    for(const court of state.courts.data) {
      hash[court.id] = court.name
    }
    return hash;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
