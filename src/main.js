import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import { firebase } from "./firebase";
import "./scss/app.scss";
import "vue-scroll-picker/dist/style.css";
import vSelect from "vue-select";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;

import VueSkeletonLoader from "skeleton-loader-vue";
import VuePageTransition from "vue-page-transition";
import * as VueGoogleMaps from "vue2-google-maps";
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import VueScrollPicker from "vue-scroll-picker";
import vmodal from "vue-js-modal";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHomeUser,
  faGlobe,
  faMapPin,
  faUser,
  faEnvelope,
  faLock,
  faVenusMars,
  faMedal,
  faCalendarCheck,
  faHome,
  faEllipsis,
  faCalendarDay,
  faXmark,
  faTrophy,
  faListCheck,
  faWrench,
  faScaleBalanced,
  faHandHoldingDollar,
  faShareNodes,
  faHashtag,
  faBagShopping,
  faThumbsUp,
  faThumbsDown,
  faCloudRain,
  faSun,
  faSearch,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueToggles from "vue-toggles";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue-select/dist/vue-select.css";

import "./registerServiceWorker";
// import './registerServiceWorker'

Vue.use(require("vue-script2"));
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB3NfZtMc1o0Mc6ZPIDm4lKpjF1CYp2204",
    libraries: "places,geometry",
  },
});
Vue.component("vue-skeleton-loader", VueSkeletonLoader);
Vue.component("moon-loader", MoonLoader);
Vue.component("VueToggles", VueToggles);
Vue.component("v-select", vSelect);

Vue.use(VuePageTransition);
Vue.use(MoonLoader);
Vue.use(VueScrollPicker);
Vue.use(vmodal);
Vue.use(DatePicker);
Vue.use(VueToast);

library.add(
  faGlobe,
  faHomeUser,
  faMapPin,
  faUser,
  faEnvelope,
  faLock,
  faVenusMars,
  faMedal,
  faCalendarCheck,
  faHome,
  faEllipsis,
  faCalendarDay,
  faXmark,
  faTrophy,
  faListCheck,
  faWrench,
  faScaleBalanced,
  faHandHoldingDollar,
  faShareNodes,
  faHashtag,
  faBagShopping,
  faThumbsUp,
  faThumbsDown,
  faCloudRain,
  faSun,
  faSearch,
  faEllipsisV
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few secs",
    ss: "%ds",
    m: "a min",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dd",
    M: "a month",
    MM: "%dM",
    y: "a year",
    yy: "%dY",
  },
});

Vue.filter("fromNow", function (value) {
  if (!value) return "";
  return moment(value).fromNow();
});
Vue.filter("yesNo", function (value) {
  return !!value ? "Yes" : "No";
});
Vue.filter("displayDate", function (value, format = "MM/DD/YYYY") {
  return !!value ? moment(value).format(format) : "";
});
Vue.filter("displayShortSport", function (value) {
  let shorted = null;
  if (value) {
    switch (value.toLowerCase()) {
      case "tennis":
        shorted = "T";
        break;
      case "pickleball":
        shorted = "P";
        break;
    }
  }
  return shorted;
});
Vue.filter("gender", function (value) {
  if (!value) return "";
  return value.toLowerCase() === "m" ? "Male" : "Female";
});
Vue.filter("displayTime", function (value) {
  if (!value) return "";
  return moment(value).format("ha").replace("m", "");
});
let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    store.dispatch("auth/setUser", user);

    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
