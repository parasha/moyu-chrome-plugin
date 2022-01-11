import '@/common/less/reset.less';

import { createApp } from "vue";
import App from './App.vue';

const AppDom = document.createElement('div');
AppDom.setAttribute('id', 'moyu-chrome-plugin-insert-pop');
document.body.appendChild(AppDom);

const app = createApp(App);
app.mount(AppDom);
