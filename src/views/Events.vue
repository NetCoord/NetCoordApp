<template>
  <div>
    <tab-header title="Events" :tabs="tabs" />
    <div class="content">
      <transition name="slide-fade">
        <today-events-list />
      </transition>
    </div>
  </div>
</template>

<script>
import TabHeader from '../components/TabHeader'
import TodayEventsList from '../components/TodayEventsList'

export default {
  name: 'Events',
  components: { TabHeader, TodayEventsList },
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
