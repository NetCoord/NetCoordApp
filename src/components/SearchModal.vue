<template>
  <modal name="search-modal" :width="300" :height="560">
    <button class="btn-cancel" @click="() => $modal.hide('search-modal')">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <div class="prompt-content">
      <div>
        <h1 v-if="!availableCourts">Search Available Courts</h1>
        <h1 v-else>
          Results for {{ startDate | displayDate }} {{ startTime | displayDate('hh:mm A')}}
        </h1>
        <template v-if="!availableCourts">
          <label>Select date</label>
          <date-picker v-model="startDate" placeholder="YYYY-MM-DD" type="date" :disabled-date="disabledDate" class="date-picker"></date-picker>
          <label>Select time</label>
          <date-picker v-model="startTime" ref="timepicker" placeholder="HH:mm" :hour-options="hourOptions" confirm type="time" format="HH:mm" :minute-step="10" :disabled-time="disabledTime" class="date-picker"></date-picker>
        </template>
        <template v-else>
          <p v-if="availableCourts.length === 0">
            No courts available at this time
          </p>
          <ul v-else class="available-court-list">
            <li v-for="(courtData, idx) in availableCourts" :key="idx">
              <div>{{ courtData.count }} of {{ courtData.court.courtNum }}</div>
              <div>{{ courtData.court.name }}</div>
            </li>
          </ul>
        </template>
      </div>
      <div>
        <button v-if="!availableCourts" class="btn-action" :disabled="submitDisabled" @click="handleSubmit">
          Search
        </button>
        <button v-else class="btn-action" @click="() => availableCourts = null">
          Search again
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex';
import CourtAvailabilityMixin from '../mixins/court-availability-mixin';

export default {
  name: 'SearchModal',
  mixins: [CourtAvailabilityMixin],
  data () {
    return {
      startDate: null,
      startTime: null,
      availableCourts: null,
      hourOptions: Array.from({ length: 17 }).map((_, i) => i + 7)
    }
  },
  computed: {
    ...mapState('court', ['courts']),
    submitDisabled () {
      return !this.startDate || !this.startTime
    }
  },
  watch: {
    startDate (val) {
      this.startTime = null
    },
    startTime (newTime, oldTime) {
      this.$refs.timepicker.closePopup()
    }
  },
  methods: {
    disabledDate: function (date) {
      const todayStart = moment().subtract(1, 'days').endOf('day');
      const limit = moment().add(2, 'days').startOf('day');
      return date < todayStart || date >= limit;
    },
    disabledTime(date) {
      if(this.startDate) {
        const isToday = moment().startOf('day').diff(this.startDate, 'days') === 0
        if (isToday) {
          return date < moment().add(1, 'hours').toDate()
        }
      }
      return null;
    },
    handleSubmit () {
      const selectedDate = moment(this.startDate).format('YYYY-MM-DD')
      const time = moment(this.startTime)
      const selectedTime = moment(this.startDate)
      selectedTime.set({
        hour: time.hour(),
        minute: time.minutes(),
        second: 0,
        millisecond: 0
      })

      const availableCourts = []
      // Use scraped data due to one hour restriction
      for (const court of this.courts.data) {
        const { availability: { count } } = this.getAvailability(court, selectedDate, selectedTime)
        if (count > 0) {
          availableCourts.push({ court, count })
        }
      }
      this.availableCourts = availableCourts
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.btn-cancel {
  font-size: 1.5em;
  color: #848484;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px;
  border: none;
  background: transparent;
}
.prompt-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: black;

  label {
    margin-bottom: 4px;
  }
  h1 {
    margin-top: 1rem;
    margin-bottom: 0.8rem;
    color: $primary;
    font-size: 1.2em;
    text-align: center;
  }
  p {
    font-size: 1.1em;
    color: black;
    text-align: center;
  }
  .btn-action {
    margin-top: 1.2rem;
    background: $primary;
    color: white;
    padding: 0.8rem 1.2rem;
    font-size: 1.1em;
    border: none;
    border-radius: 8px;

    &:disabled {
      opacity: 0.3;
    }
  }
  .date-picker {
    margin-bottom: 8px;
    width: 100%;
  }
  .available-court-list {
    list-style: none;
    overflow: scroll;
    max-height: 340px;

    li {
      display: grid;
      grid-template-columns: 60px 1fr;
      grid-gap: 1rem;
      padding: 6px 0;
      border-bottom: 1px solid #FF3464;
    }
  }
}
</style>