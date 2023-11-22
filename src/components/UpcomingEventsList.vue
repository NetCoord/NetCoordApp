<template>
  <div class="events-list">
    <div class="events-list_row events-list_header">
      <span>Park</span>
      <span>Event Name</span>
      <span>Sport</span>
      <span>When</span>
    </div>
    <moon-loader v-if="loading" color="white" class="fixed-center" />
    <template v-else>
      <div v-if="!events.length" class="events-list_empty">
        No events scheduled for today
      </div>
      <div v-else>
        <div v-for="groupEventDate in Object.keys(groupedEvents)" :key="groupEventDate">
          <div class="events-list_separator">{{ groupEventDate | displayDate('dddd MMMM Do, YYYY') }}</div>
          <div v-for="(event, idx) in groupedEvents[groupEventDate]" :key="idx" class="events-list_row">
            <span>{{ getCourtNames(event) }}</span>
            <span>{{ event.name }}</span>
            <span class="highlight">{{ event.sport | displayShortSport }}</span>
            <span>{{ event.startTime.toDate() | displayDate('hh:mm A') }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: "UpcomingEventsList",
  data () {
    return {
      loading: false,
      events: []
    }
  },
  mounted () {
    this.fetchAllEvents()
  },
  computed: {
    ...mapState('court', ['courts']),
    ...mapGetters({
      courtIdToName: 'court/courtIdToName',
    }),
    groupedEvents () {
      let groups = {}

      for(const event of this.events) {
        const dateStr = moment(event.startTime.toDate()).format('YYYY-MM-DD')
        if(!(dateStr in groups)) {
          groups[dateStr] = []
        }
        groups[dateStr].push(event)
      }
      return groups;
    }
  },
  methods: {
    async fetchAllEvents() {
      this.loading = true
      const events = await this.$store.dispatch('court/fetchAllEvents')

      const today = moment()
      const upcomingEvents = events.filter(({ startTime }) =>
        today.isBefore(startTime.toDate())
      )
      this.events = upcomingEvents;
      this.loading = false
    },
    getCourtNames (event) {
      return Object.keys(event.courtDetails)
        .map(id => this.courtIdToName[id])
        .filter(name => name)
        .join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.events-list {
  padding: 0.4rem;

  &_row {
    display: grid;
    grid-template-columns: 100px 1fr 40px 46px;
    grid-gap: 8px;
    gap: 8px;
    border-bottom: 1px solid $primary;
    padding: 8px 0px;

    span {
      overflow: hidden;
      white-space: pre-line;
      text-overflow: ellipsis;

      &.highlight {
        color: $primary;
      }
      &:nth-of-type(3) {
        text-align: center;
      }
      &:nth-of-type(4) {
        text-align: right;
      }
    }
  }
  &_header {
    color: $primary;
    font-weight: 500;
  }
  &_empty {
    margin-top: 8px;
    text-align: center;
  }
  &_separator {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $primary;
    padding: 2px;
  }
}
</style>