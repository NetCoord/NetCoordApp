<template>
  <div>
    <modal name="pwa-prompt-modal" :width="300" :height="400">
      <button class="btn-cancel" @click="dismissPrompt">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
      <div class="prompt-content">
        <img class="logo" src="@/assets/images/logo.png" alt="NetCoord" />
        <h1>NetCoord App</h1>
        <!-- <p>this website becomes a mobile app when added to home screen</p> -->
        <p>this website becomes a mobile app when added to home screen</p>
        <button class="btn-action" @click="installPWA">Tap to install</button>
      </div>
    </modal>
  </div>
</template>

<script>
import PwaMobile from "./PwaMobile.vue";
const isStandalonePWAInstalled = () => {
  if ("standalone" in navigator) {
    // iOS devices
    return navigator.standalone;
  }
  if (
    window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    // Other platforms with support for the media query
    return true;
  }
  // PWA is not installed
  return false;
};
const isMobile = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  return /iphone|ipad|ipod|android|webos|blackberry|windows phone/i.test(
    userAgent
  );
};

const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;

export default {
  name: "PWAPrompt",
  data: () => ({
    installEvent: null,
    isIPhone: false,
  }),
  components: { PwaMobile },

  methods: {
    showModal() {
      this.$modal.show(
        PwaMobile,
        { text: "This text is passed as a property" },
        { draggable: true, height: "400px", width: "300px" },
        {
          "before-close": (event) => {
            sessionStorage.setItem("shown", true);
          },
        }
      );
    },

    show() {
      this.$modal.show("pwa-prompt-modal");
    },

    hideModal() {
      this.$modal.hide("mobile-pwa-prompt-modal");
    },

    hide() {
      this.$modal.hide("pwa-prompt-modal");
    },
    dismissPrompt() {
      this.hide();
    },
    installPWA() {
      this.installEvent.prompt();
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt(); // Hide the prompt once the user's clicked
        if (choice.outcome === "accepted") {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      });
    },
  },

  mounted() {
    const shown = sessionStorage.getItem("shown");

    if (isMobile() && !isInStandaloneMode() && !shown) {
      if (!isStandalonePWAInstalled()) {
        this.isIPhone = true;
        this.showModal();
      }
    }
  },
  created() {
    setTimeout(() => {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();

        this.installEvent = e;
        this.show();
      });
    }, 3000);
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
