<template>
  <div>
    <moon-loader v-if="courts.loading" color="white" class="fixed-center" />
    <template v-else-if="selectedCourt">
      <court-header :court="selectedCourt" />
      <div class="content">
        <transition name="slide-fade">
          <court-count-view key="count" :court="selectedCourt" />
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
import BackButton from "../components/BackButton";
import CourtCountView from "../components/CourtCountView";
import CourtHeader from "../components/CourtHeader";
import CourtMixin from '../mixins/court-mixin';

export default {
  name: "court",
  mixins: [CourtMixin],
  components: { BackButton, CourtCountView, CourtHeader }
};
</script>
