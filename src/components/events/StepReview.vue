<template>
  <div>
    <div class="review-grid">
      <h3>Event Type</h3>
      <span>{{ `${formCreateEvent.selectedGender}'s ${formCreateEvent.selectedSport}` }}</span>
      <h3>Start</h3>
      <span>{{ formCreateEvent.startDate | displayDate }} {{ formCreateEvent.startTime | displayDate('hh:mm A') }}</span>
      <h3>End</h3>
      <span>{{ formCreateEvent.endDate | displayDate }} {{ formCreateEvent.endTime | displayDate('hh:mm A') }}</span>
      <h3>Park(s)</h3>
      <span>{{ formCreateEvent.selectedCourts.map(c => c.name).join(', ') }}</span>
    </div>
    <div
      v-for="selectedCourt in formCreateEvent.selectedCourts"
      :key="selectedCourt.id"
      class="court-detail"
    >
      <h4>{{ selectedCourt.name }}</h4>
      <div
        v-for="courtNum in Object.keys(formCreateEvent.selectedCourtNumbers[selectedCourt.id])"
        :key="courtNum"
        class="court-detail-player-grid"
      >
        <template v-for="player in formCreateEvent.selectedCourtNumbers[selectedCourt.id][courtNum]">
          <p :key="`name-${player.id}`">{{ player.name }}</p>
          <span :key="`court name-${player.id}`">Court {{ courtNum }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['clickedNext', 'currentStep'],
  components: { },
  data () {
    return {
      activeCourtWithNumber: [],
      rosters: [],
      repopulateExisting: false
    }
  },
  computed: {
    ...mapState('court', ['courts', 'formCreateEvent']),
    existingPlayers () {
      if (this.repopulateExisting) {
        this.repopulateExisting = false
      }
      if (!this.activeCourtWithNumber.length) {
        return []
      }

      const courtId = this.activeCourtWithNumber[0]
      const courtNum = this.activeCourtWithNumber[1]
      return this.formCreateEvent.selectedCourtNumbers[courtId][courtNum]
    }
  },
  mounted () {
    this.$emit('can-continue', {value: true});
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/variable";

.review-grid {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  grid-gap: 1rem;

  h3 {
    font-size: 1.3em;
    font-weight: 600;
    color: $primary;
  }
}
.court-detail {
  margin-top: 1rem;

  h4 {
    color: $primary;
    text-align: center;
    font-size: 1.3em;
    margin-bottom: 1rem;
  }
}
.court-detail-player-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
  margin-bottom: 0.8rem;
}
</style>
