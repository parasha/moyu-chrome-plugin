import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// 页面
import Home from './pages/home.vue';
import Search from './pages/search.vue';
import User from './pages/user.vue';


const routes: RouteRecordRaw[]  = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        // 这个是给打包后的 popup 准备的
        path: '/popup.html',
        redirect: '/home'
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  next();
});
export default router;
