<template>
  <div class="bottom-tab">
    <div class="menu">
      <button
        v-for="(menu, idx) in menus"
        :key="idx"
        @click="
          menu.link
            ? openUrl(menu.link)
            : menu.pop
            ? $modal.show('search-modal')
            : goTo(menu.to)
        "
        :class="`${menu.to === $route.name ? 'active' : ''}`"
      >
        <img v-if="menu.middle" :src="addButtonImage" alt="" />
        <img v-else-if="menu.imgsrc" :src="menu.imgsrc" alt="" />
        <font-awesome-icon v-else :icon="menu.icon" />
      </button>
    </div>
    <!-- <SearchModal /> -->
  </div>
</template>

<script>
import SearchModal from "./SearchModal.vue";
export default {
  name: "BottomTab",
  components: { SearchModal },
  data() {
    return {
      menus: [
        {
          icon: "fa-solid fa-globe",
          to: "home",
        },
        {
          imgsrc: require("@/assets/Restring_Icon_180.svg"),
          link: "https://forms.gle/NXRVSpruVdjksDfb9",
        },

        {
          to: "courtReportStatus",
          imgsrc: require("@/assets/Checkin_Button_180.svg"),
        },
        {
          pop: "courtReportStatus",
          icon: "fa-solid fa-search",
        },
        // {
        //   icon: "fa-solid fa-user",
        //   to: "profile",
        // },
        {
          icon: "fa-solid fa-ellipsis",
          to: "more",
        },
      ],
    };
  },
  computed: {
    addButtonImage() {
      return this.$route.name === "courtReportStatus"
        ? require("@/assets/images/add-button-active.svg")
        : require("@/assets/images/add-button.svg");
    },
  },
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
    goTo(routeName) {
      this.$router.push({
        name: routeName,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.bottom-tab {
  // background-color: rgba(255, 255, 255, 0.25);
  background: hsla(0, 0%, 100%, 0.25);
  width: 96vw;
  max-width: 25rem;
  height: 3rem;
  position: fixed;
  //bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40px;
  z-index: 200;

  .menu {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.6rem;
    gap: 0.6rem;
    align-items: center;
    height: 100%;
    padding: 0.4rem;

    button {
      height: 100%;
      background: transparent;
      border: none;
      font-size: 1.3em;
      color: $primary;
      position: relative;

      &.active {
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 70%;
          transform: translateX(-50%);
          height: 2px;
          background-color: $primary;
        }
      }

      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
