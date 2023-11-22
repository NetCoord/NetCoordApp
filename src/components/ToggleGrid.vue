<template>
  <div class="toggle-grid">
    <button
      v-for="option in options"
      :key="option.value"
      :class="{'selected': selectedOption === option.value }"
      @click="() => $emit('selected', option.value)"
    >{{ option.label }}</button>
  </div>
</template>

<script>
export default {
  name: 'ToggleGrid',
  props: {
    options: {
      type: Array
    },
    selectedOption: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.toggle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1rem;
  gap: 1rem;
  align-items: center;

  & > button {
    height: 36px;
    color: rgba(0,0,0,0.5);
    border: 2px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255,255,255,0.4);
    border-radius: 4px;
    font-size: 16px;

    &.selected {
      color: rgba(0,0,0,0.8);
      border-color: $primary;
      color: black;
    }
  }
}
</style>
