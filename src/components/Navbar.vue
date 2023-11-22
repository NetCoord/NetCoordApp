<template>
  <div class="navbar">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <img
        src="../assets/images/logo-text.svg"
        class="bg-img"
        alt="NetCoord"
        @click="goToHome"
      />
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  // padding: 0.5rem 1rem;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  .bg-img {
    width: auto;
    height: 48px;
    z-index: -1;
    cursor: pointer;
  }
  .right {
    display: flex;
    justify-content: end;
  }
}
</style>
