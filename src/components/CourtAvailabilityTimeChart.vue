<template>
  <div class="chart">
    <div class="timeslot">
      <div v-for="(hour, idx) in courtHours" :key="idx">
        {{ hour | displayTime }}
      </div>
    </div>
    <div class="timeslot">
      <div v-for="(hour, idx) in courtHours" :key="idx" class="available-slot">
        <div class="fill" :style="getFillStyle(hour)" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex';

export default {
  name: 'court-availability-time-chart',
  props: {
    court: {
      type: Object
    },
    courtNum: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      courtWithTimes: 'court/courtWithTimes',
    }),
    courtNumAvailability () {
      const courtNumTimes = this.courtWithTimes[this.court.id] ? this.courtWithTimes[this.court.id][this.courtNum] : []
      const today = moment().format('YYYY-MM-DD')
      const todayAvailability = courtNumTimes.find(record => record.date === today)
      return todayAvailability?.available_times?.filter(({ availability }) => availability === 'Available') || []
    },
    courtHours () {
      const start = moment({hour: 7})
      const end = moment({hour: 23})

      const hours = []
      while(start <= end) {
        hours.push(start.toDate())
        start.add(1, 'hours');
      }
      return hours
    }
  },
  methods: {
    getFillStyle (hour) {
      const hourEnd = moment(hour).add(1, 'hours');

      let isHourAvailable = false;
      let startFound = null;
      let endFound = null;

      this.courtNumAvailability.every(({ end_time, start_time }) => {
        const today = moment().format('YYYY-MM-DD')
        const startTime = moment(today + ' ' + start_time);
        const endTime = moment(today + ' ' + end_time);

        if(moment(hour).isBetween(startTime, endTime, undefined, '[]') ||
          moment(hourEnd).isBetween(startTime, endTime, undefined, '(]')
        ) {
          isHourAvailable = true;
          startFound = startTime;
          endFound = endTime;
          return false;
        }
        return true;
      })

      if (!isHourAvailable) {
        return {}
      }

      // Determine left fill percentage
      let left = 0;
      if (startFound.isAfter(hour)) {
        const mins = startFound.minutes();
        left = mins / 60 * 100;
      }

      // Determine width fill percentage
      let width = 0;
      const duration = moment.duration(endFound.diff(startFound));
      const diffMinutes = duration.asMinutes()
      width = diffMinutes > 60 ? 100 : (diffMinutes / 60 * 100);
    
      return {
        width: `${width}%`,
        left: `${left}%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.chart {
  margin: 1rem 0;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
.timeslot {
  width: 100%;
  display: grid;
  grid-auto-columns: minmax(40px, 1fr);
  grid-auto-flow: column;

  & > div {
    text-align: center;
    background: black;
    padding: 4px 0;
  }
  & > * + * {
    border-left: 1px solid grey;
  }

  .available-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    position: relative;
  
    .fill {
      position: absolute;
      background-color: #60fb60;
      height: 100%;
      left: 0;
      width: 0;
    }
  }
}
</style>