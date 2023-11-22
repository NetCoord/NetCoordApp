<template>
  <div>
    <moon-loader v-if="courts.loading" color="white" class="fixed-center" />
    <template v-else>
      <div class="content">
        <div class="header">
          <h1>Courts Status</h1>
          <div style="color: #000 !important" class="select-wrapper">
            <v-select
              :options="courtOptions"
              placeholder="Select Court"
              v-model="selectedCourt"
              :reduce="(opt) => opt.value"
            />
          </div>
        </div>
        <transition name="slide-fade">
          <court-count-view key="count" :court="selectedCourt" />
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BackButton from "../components/BackButton";
import CourtCountView from "../components/CourtCountView";

export default {
  name: "courtReportStatus",
  components: { BackButton, CourtCountView },
  data() {
    return {
      selectedCourt: null,
    };
  },
  computed: {
    ...mapState("court", ["courts"]),
    courtOptions() {
      return this.courts.data
        .map((court) => ({
          label: court.name,
          value: court,
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1));
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  padding: 0 1rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
}

.vs__search,
.vs__dropdown-toggle {
  background: none !important;
}
</style>
