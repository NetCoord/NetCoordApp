import { mapState, mapActions } from 'vuex';

export default {
  watch: {
    courts (val) {
      if (!val.loading) {
        this.refreshSelected()
      }
    }
  },
  computed: {
    ...mapState('court', ['courts', 'selectedCourt']),
  },
  created () {
    this.setSelectedCourt(null)
  },
  mounted () {
    this.refreshSelected()
  },
  methods: {
    ...mapActions('court', ['setSelectedCourt']),
    refreshSelected () {
      const courtId = this.$route.params.id
      let selectedCourt
      if (courtId) {
        selectedCourt = this.courts.data.find(c => c.id === courtId)
      }
      this.setSelectedCourt(selectedCourt)
    },
  }
}