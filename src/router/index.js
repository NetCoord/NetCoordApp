import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { auth } from "../firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = auth.currentUser;

  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    next({
      name: "login",
      query: { nextUrl: to.fullPath },
    });
    if (to.name != "login") {
      router.app.$toast.error("please login to continue", {
        // override the global option
        position: "bottom",
      });
    }
  } else if (to.matched.some((record) => record.meta.guest) && user) {
    if (to.query.nextUrl) {
      const queries = Object.keys(to.query)
        .filter((key) => key !== "nextUrl")
        .map((key) => `${key}=${to.query[key]}`)
        .join("&");
      if (queries) {
        return next({
          path: `${to.query.nextUrl}?${queries}`,
        });
      } else {
        return next({
          path: to.query.nextUrl,
        });
      }
    } else {
      next({
        name: "home",
      });
    }
  } else {
    next();
  }
});
export default router;
