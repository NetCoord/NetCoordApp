<template>
  <a class="goback" @click="handleBack"><i class="fas fa-chevron-left"></i></a>
</template>

<script>
export default {
  name: 'back-button',
  props: {
    to: {
      type: Object
    }
  },
  methods: {
    handleBack () {
      if (this.to) {
        this.$router.push(this.to)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.goback {
  font-size: 1.4rem;
  text-transform: capitalize;
  color: $primary;
  cursor: pointer;
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
}
</style>
