import { mapGetters } from 'vuex';
import moment from 'moment'

export default {
  computed: {
    ...mapGetters({
      courtWithTimes: 'court/courtWithTimes',
    })
  },
  methods: {
    getAvailability (court, date, time) {
      let count = 0
      let availableAt = null
      let unavailableAt = null

      if (this.courtWithTimes && court.id in this.courtWithTimes) {
        // Get available court count
        Object.keys(this.courtWithTimes[court.id]).forEach((courtNum) => {
          const dateAvailability = this.courtWithTimes[court.id][courtNum].find(record => record.date === date)

          let isAvailable = false
          if (dateAvailability) {
            dateAvailability.available_times.forEach(({ availability, end_time, start_time }) => {
              if (availability === 'Available') {
                const startTime = moment(date + ' ' + start_time);
                const endTime = moment(date + ' ' + end_time);
                
                if (time.isBetween(startTime, endTime, undefined, '[)')) {
                  isAvailable = true
                  
                  if (!unavailableAt || endTime.isBefore(unavailableAt)) {
                    unavailableAt = endTime
                  }
                } else {
                  if (!availableAt || startTime.isBefore(availableAt)) {
                    availableAt = startTime
                  }
                }
              }
            })
          }

          if (isAvailable) {
            count++
          }
        })
      }
      return {
        availability: {
          count,
          availableAt,
          unavailableAt
        }
      }
    },
    getTodayAvailability (court) {
      const oneHourFromNow = moment().add(1, 'hours')
      const today = oneHourFromNow.format('YYYY-MM-DD')
      return this.getAvailability(court, today, oneHourFromNow)
    },
    getFreeCourt (court) {
      const userUpdateTimeLimit = moment(court.updatedAt).add(20, 'minutes')

      if(moment().isAfter(userUpdateTimeLimit)) {
        // Use scraped data since free court number from user update is no longer valid
        const { availability } = this.getTodayAvailability(court)
        return availability.count;
      } else {
        return court.freeCourt || 0
      }
    }
  }
}