import '@/common/less/reset.less';

import { createApp } from "vue";
import App from './App.vue';

const cache = {};

const contentInit = (tabId, book) => {
    if (cache[tabId]) {
        console.log('重复打开');
        return;
    }
    console.log('content init:', book);

    const AppDom = document.createElement('div');
    AppDom.setAttribute('id', 'moyu-chrome-plugin-insert-pop');
    document.body.appendChild(AppDom);

    const app = createApp(App, {bookInfo: book});
    app.mount(AppDom);

    cache[tabId] = true;
}

console.log('content 事件绑定')
if (ENV === "development") {
    window.onload = () => {
        window.chromeEvent.on('content-render', (bookInfo) => contentInit('demo', bookInfo));
    };
} else {
    // 监听 chrome message 通讯 
}