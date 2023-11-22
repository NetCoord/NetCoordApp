<template>
  <tab-header :title="court.name" :tabs="tabs" />
</template>

<script>
import TabHeader from './TabHeader'

export default {
  name: "court-header",
  components: { TabHeader },
  props: {
    court: {
      type: Object,
      required: true
    },
  },
  computed: {
    tabs () {
      return [
        {
          label: 'Schedule Today',
          to: `/${this.court.id}`
        },
        {
          label: 'Report',
          to: `/${this.court.id}/report`
        },
        {
          label: 'Park Details',
          to: `/${this.court.id}/details`
        }
      ]
    }
  }
};
</script>
