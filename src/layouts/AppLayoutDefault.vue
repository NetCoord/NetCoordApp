<template>
  <div class="app-wrapper" :class="{ rainy: isRainyView }">
    <Navbar>
      <template v-slot:left>
        <back-button v-if="backRoute" :to="backRoute" />
      </template>
      <template v-slot:right>
        <button
          v-if="showSearch"
          class="btn-search"
          @click="
            () =>
              $router.push({
                name: 'profile',
              })
          "
        >
          <font-awesome-icon icon="fa-solid fa-user" />
        </button>
      </template>
    </Navbar>
    <div class="app-page">
      <slot />
    </div>
    <SearchModal />
    <BottomTab v-if="!hideBottomTab" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar.vue";
import BottomTab from "../components/BottomTab.vue";
import SearchModal from "../components/SearchModal.vue";

export default {
  name: "AppLayoutDefault",
  components: { BackButton, Navbar, BottomTab, SearchModal },
  computed: {
    ...mapState("court", ["selectedCourt"]),
    backRoute() {
      let to = null;
      switch (this.$route.name) {
        case "court":
          to = { name: "home" };
          break;
        case "courtDetails":
        case "courtSchedule":
        case "courtReport":
          to = { name: "home" };
          break;
        case "legal":
          to = { name: "more" };
          break;
        case "login":
        case "register":
          to = { name: "home" };
          break;
      }
      return to;
    },
    showSearch() {
      return this.$route.name !== "profile";
    },
    isRainyView() {
      return (
        ["court", "courtDetails"].includes(this.$route.name) &&
        this.selectedCourt?.isRaining
      );
    },
    hideBottomTab() {
      return ["login", "register"].includes(this.$route.name);
    },
  },
  mounted() {
    this.getCourts();
    this.getCourtAvailability();
  },
  methods: {
    ...mapActions("court", ["getCourts", "getCourtAvailability"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.app-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0px auto;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(0deg, #0e0036 0%, #000000 100%);

  &.rainy {
    background: linear-gradient(0deg, #000000 0%, #247591 100%);
  }

  .app-page {
    height: calc(100vh - 136px);
    overflow: scroll;
    z-index: 2;

    &::-webkit-scrollbar {
      display: none;
    }
    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  &::v-deep .adswrapper,
  &::v-deep .adsins {
    background-color: rgba(255, 255, 255, 0.22);
    height: 80px;
    width: 100%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .btn-search {
    background: none;
    border: none;
    color: $primary;
    font-size: 1.3em;
  }
}
</style>
