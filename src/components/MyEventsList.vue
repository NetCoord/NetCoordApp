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
        No events available
      </div>
      <div v-else>
        <div v-for="(event, idx) in events" :key="idx" class="events-list_row">
          <span>{{ getCourtNames(event) }}</span>
          <span>{{ event.name }}</span>
          <span class="highlight">{{ event.sport | displayShortSport }}</span>
          <span>{{ event.startTime.toDate() | displayDate('hh:mm A') }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: "MyEventsList",
  data () {
    return {
      loading: false,
      events: []
    }
  },
  mounted () {
    this.fetchMyEvents()
  },
  computed: {
    ...mapState('court', ['courts']),
    ...mapGetters({
      courtIdToName: 'court/courtIdToName',
    })
  },
  methods: {
    async fetchMyEvents() {
      this.loading = true
      const events = await this.$store.dispatch('court/fetchMyEvents')
      this.events = events;
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