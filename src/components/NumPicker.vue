<template>
  <scroll-picker v-model="localValue" :options="options" />
</template>

<script>
export default {
  name: "num-picker",
  props: {
    value: { type: Number },
    options: { type: Array }
  },
  data () {
    return {
      optionChanged: false
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        if (!this.optionChanged) {
          this.$emit('input', val)
        }
      }
    }
  },
  watch: {
    options () {
      this.optionChanged = true
      setTimeout(() => {
        this.optionChanged = false
      }, 300)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/variable";

.vue-scroll-picker {
  background-color: #fff;
  color: #000;
  max-width: 90%;
  margin: auto;
  border: 2px solid $primary;
  border-radius: 15px;
  font-weight: 600;
  position: relative;
  height: 187px;
  overflow: hidden;
  height: 187px;

  & ::v-deep .vue-scroll-picker-layer {
    .top {
      height: calc(50% - 2em);
    }
    .middle {
      top: calc(50% - 2em);
      bottom: calc(50% - 2em);
    }
    .bottom {
      height: calc(50% - 2em);
    }
  }

  & ::v-deep .vue-scroll-picker-item {
    height: 4rem;
    line-height: 4rem;
    font-size: 2.6rem;
  }
}
</style>
