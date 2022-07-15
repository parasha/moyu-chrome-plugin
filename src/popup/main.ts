import "@/common/style/reset.less";

import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";
import {initMessageChannel} from '@/common/js/chrome-message';

const app = createApp(App);
app.use(createPinia()).use(router);

// 初始化 message
const port = await initMessageChannel();
app.provide('port', port);

app.mount("#app");
