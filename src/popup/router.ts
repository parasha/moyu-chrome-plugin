import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from './store';

const routes: RouteRecordRaw[]  = [
  {
    path: "/",
    component: () => import("./pages/home.vue"),
  },
  {
    path: "/search",
    component: () => import("./pages/search.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('getStorageBooks');
  next();
});
export default router;
