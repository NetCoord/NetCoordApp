<template>
  <div>
    <tab-header title="My Events" :tabs="tabs" />
    <div class="content">
      <transition name="slide-fade">
        <my-events-list />
      </transition>
    </div>
  </div>
</template>

<script>
import TabHeader from '../components/TabHeader'
import MyEventsList from '../components/MyEventsList'

export default {
  name: 'EventsMyEvents',
  components: { TabHeader, MyEventsList },
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
