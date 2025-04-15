import { createRouter, createWebHistory } from "vue-router";
import Welcome from "./app/welcome/App.vue";
import MasterData from "./app/master-data/App.vue";
import AccessControl from "./app/access-control/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Welcome,
    },
    {
      path: "/master-data",
      component: MasterData,
    },
    {
      path: "/access-control",
      component: AccessControl,
    },
  ],
});

export default router;
