<template>
  <div class="toggle">
    <div
      class="toggle_wet"
      :class="{'selected': value}"
      @click="localValue = true"
    >
      <font-awesome-icon icon="fa-solid fa-cloud-rain" />
      <span>Unplayable</span>
    </div>
    <div
      class="toggle_dry"
      :class="{'selected': !value}"
      @click="localValue = false"
    >
      <font-awesome-icon icon="fa-solid fa-sun" />
      <span>Ready for Play</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "weather-toggle",
  props: {
    value: { type: Boolean }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.toggle {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-gap: 1rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.25);
    padding: 1rem;
    border-radius: 20px;
    height: 120px;
    cursor: pointer;
    border: 2px solid transparent;

    &.selected {
      border: 2px solid $primary;
    }

    svg {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
    }
  }

  &_wet {
    svg {
      color: #3c728d;
    }
  }
  &_dry {
    svg {
      color: #ceb04e;
    }
  }
}
</style>
