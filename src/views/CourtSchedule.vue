<template>
  <div>
    <moon-loader v-if="courts.loading" color="white" class="fixed-center" />
    <template v-else-if="selectedCourt">
      <court-header :court="selectedCourt" />
      <div class="content">
        <transition name="slide-fade">
          <court-schedule-view key="count" :court="selectedCourt" />
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
import BackButton from "../components/BackButton";
import CourtScheduleView from "../components/CourtScheduleView";
import CourtHeader from "../components/CourtHeader";
import CourtMixin from '../mixins/court-mixin';

export default {
  name: "CourtSchedule",
  mixins: [CourtMixin],
  components: { BackButton, CourtScheduleView, CourtHeader },
};
</script>
