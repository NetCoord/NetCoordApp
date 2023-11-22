<template>
  <div>
    <button class="btn-cancel" @click="closer">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <div class="prompt-content">
      <img class="logo" src="@/assets/images/logo.png" alt="NetCoord" />
      <h1>NetCoord App</h1>
      <p>This website becomes a mobile app when added to home screen</p>
      <p v-if="isIPhone">
        1. Tap on the
        <img width="40" src="@/assets/images/share.png" alt="NetCoord" />
      </p>

      <p v-if="isAndroid">
        1. Tap on the
        <font-awesome-icon icon="fas fa-ellipsis-v" />
      </p>

      <p>2. Select <button>Add to Home Screen</button></p>
    </div>
  </div>
</template>

<script>
const userAgent = navigator.userAgent.toLowerCase();
const isAndroid = /android/i.test(userAgent);
const isIos = /iphone|ipad|ipod/.test(userAgent);
export default {
  name: "PwaMobile",
  data: () => ({
    installEvent: null,
    isIPhone: isIos,
    isAndroid: isAndroid,
  }),
  methods: {
    closer() {
      this.$modal.hide(this.$parent.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.btn-cancel {
  font-size: 1.5em;
  color: #848484;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px;
  border: none;
  background: transparent;
}
.prompt-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;

  .logo {
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }
  h1 {
    margin-top: 1rem;
    margin-bottom: 0.8rem;
    color: $primary;
    font-size: 1.6em;
  }
  p {
    font-size: 1.1em;
    color: black;
    text-align: center;
    margin-bottom: 10px;
  }
  .btn-action {
    margin-top: 1.2rem;
    background: $primary;
    color: white;
    padding: 0.8rem 1.2rem;
    font-size: 1.1em;
    border: none;
    border-radius: 8px;
  }
}
</style>
