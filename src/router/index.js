import Vue from "vue";
import VueRouter from "vue-router";
import { RouteName } from "./router.const";
import Home from "../views/home.vue";
import Analysis from "../views/analysis.vue";
import Error from "../views/error.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: RouteName.HOME.path,
    name: RouteName.HOME.name,
    component: Home,
  },
  {
    path: RouteName.ANALYSIS.path,
    name: RouteName.ANALYSIS.name,
    component: Analysis,
    beforeEnter: (from, to, next) => {
      if (!store.getters.getUsername) next({ name: RouteName.HOME.name });
      else next();
    },
  },
  {
    path: RouteName.ERROR.path,
    name: RouteName.ERROR.name,
    component: Error,
  },
  {
    path: "*",
    beforeEnter: (from, to, next) => next({ name: RouteName.ERROR.name }),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
