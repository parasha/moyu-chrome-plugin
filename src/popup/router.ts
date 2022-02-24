import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import useStore from './store';

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

let store;

router.beforeEach(async (to, from, next) => {
  if(!store){
    store = useStore();
  }
  // 这个其实没必要，看看以后换个地方
  await store.getStorageBooks();
  next();
});
export default router;
