<template>
  <div>
    <div>
      <h2>Availability</h2>
      <div class="select-wrapper">
        <v-select
          :options="courtOptions"
          placeholder="Select Court"
          v-model="selectedCourtNum"
          :reduce="opt => opt.value"
        />
      </div>
      <div v-if="selectedCourtNum">
        <court-availability-time-chart :court="court" :courtNum="selectedCourtNum" />
        <!-- <h2>Events</h2>
        <moon-loader v-if="loading" color="white" class="fixed-center" />
        <template v-else>
          <div v-if="!events.length" class="text-center">
            No events scheduled for today
          </div>
          <div v-else>
            <div v-for="(event, idx) in events" :key="idx" class="event-item">
              <h3>{{ event.name }}</h3>
              <p>{{ event.gender }} {{ event.sport }}</p>
              <p>Starts at: {{ event.startTime.toDate() | displayDate('ddd DD MMM hh:mm A') }}</p>
              <p>Ends at: {{ event.endTime.toDate() | displayDate('ddd DD MMM hh:mm A') }}</p>
            </div>
          </div>
        </template> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import CourtAvailabilityTimeChart from './CourtAvailabilityTimeChart';

export default {
  name: 'court-schedule-view',
  components: { CourtAvailabilityTimeChart },
  props: {
    court: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedCourtNum: null,
      loading: false,
      events: []
    };
  },
  computed: {
    courtOptions () {
      return [...Array(this.court.courtNum).keys()] 
        .map(i => ({ label: `Court ${i+1}`, value: i+1, name: i+1 }))
    }
  },
  watch: {
    selectedCourtNum (val) {
      if (val) {
        // this.fetchEvents()
      }
    }
  },
  methods: {
    async fetchEvents() {
      const params = {
        courtId: this.court.id,
        courtNum: this.selectedCourtNum
      }
      this.loading = true
      const events = await this.$store.dispatch('court/fetchEvents', params)

      const today = moment()
      const todayEvents = events.filter(({ startTime, endTime }) =>
        today.isBetween(startTime.toDate(), endTime.toDate())
      )
      this.events = todayEvents;

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 18px;
  text-align: center;
  line-height: 1.3;
  margin-left: auto;
  margin-right: auto;
}

.event-item {
  border-bottom: 1px solid $primary;
  padding-bottom: 8px;

  h3 {
    text-transform: capitalize;
  }
}
</style>
