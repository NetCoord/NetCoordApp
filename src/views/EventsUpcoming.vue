<template>
  <div>
    <tab-header title="Events" :tabs="tabs" />
    <div class="content">
      <transition name="slide-fade">
        <upcoming-events-list />
      </transition>
    </div>
  </div>
</template>

<script>
import TabHeader from '../components/TabHeader'
import UpcomingEventsList from '../components/UpcomingEventsList'

export default {
  name: 'EventsUpcoming',
  components: { TabHeader, UpcomingEventsList },
  computed: {
    tabs () {
      return [
        {
          label: 'Today',
          to: `/events`
        },
        {
          label: 'Upcoming',
          to: `/events/upcoming`
        },
        {
          label: 'My Events',
          to: `/events/my-events`
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
