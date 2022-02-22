import "@/common/less/reset.less";

import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia()).use(router);
app.mount("body");
