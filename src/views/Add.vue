<template>
  <div class="add-page">
    <button @click="goTo('courtReportStatus')">
      <div>
        <span>Report Court Status</span>
        <img src="../assets/images/court-status.png" alt="" /> 
      </div>
    </button>
    <div class="or">or</div>
    <button @click="goTo('createEvent')">
      <div>
        <img src="../assets/images/calendar.png" alt="" /> 
        <span>Create New Event</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Add',
  methods: {
    goTo(routeName) {
      this.$router.push({
        name: routeName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-page {
  height: calc(100vh - 80px);
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr;

  .or {
    position: relative;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 1.4em;

    &::before,
    &::after {
      position: absolute;
      width: 160px;
      height: 1px;
      top: 22px;
      background-color: #aaa;
      content: '';
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }

  button {
    background: transparent;
    border: none;

    &:nth-of-type(1) > div {
      display: grid;
      grid-template-columns: 100px auto;
      grid-gap: 1rem;
      align-items: center;
      max-width: 300px;
      margin: 0 auto;

      span {
        text-align: right;
        font-weight: 600;
        line-height: 1.4em;
        color: white;
        font-size: 2em;
      }
      img {
        height: 180px;
        width: 180px;
      }
    }
    &:nth-of-type(2) > div {
      display: grid;
      grid-template-columns: auto 100px;
      grid-gap: 2rem;
      justify-content: center;
      align-items: center;
      max-width: 300px;
      margin: 0 auto;

      span {
        text-align: left;
        font-weight: 600;
        line-height: 1.4em;
        color: white;
        font-size: 2em;
      }
      img {
        height: 120px;
        width: 120px;
      }
    }
  }
}
</style>