<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <div class="header_tabs">
      <router-link
        v-for="(tab, idx) in tabs"
        :key="idx"
        :to="tab.to"
        class="header_tabs_tab"
      >
        {{ tab.label }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab-header",
  props: {
    tabs: {
      type: Array,
      required: true
    },
    title: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/variable";

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  padding: 0 1rem;

  h1 {
    font-family: "Franklin Gothic";
    font-size: 2rem;
    margin-bottom: 10px;
  }

  &_tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: #a6a6a6;
    padding: 2px;
    grid-gap: 2px;
    width: 100%;

    &_tab {
      text-decoration: none;
      padding: 4px 6px;
      display: flex;
      justify-content: center;
      align-content: center;
      color: #868686;
      font-size: 0.9em;
      background-color: #bfc0c0;
      width: 100%;

      &.router-link-exact-active {
        background-color: $primary;
        color: white;
      }
    }
  }
}
</style>
