import '@/common/less/reset.less';

import { createApp } from "vue";
import { PageType, BookDetail } from '@/definitions/content';
import { eventPromisefy } from '@/common/js/promisefy';
import App from './App.vue';


/**
 * initContent 要做两件事：
 * 1. 实例化 App
 * 2. 获取小说的基本信息
 */
const initContentApp = async (tabId: string, book: BookDetail, type: PageType) => {


    initApp(tabId, book, type);
}

const initApp = (() => {
    const cache = {};

    return (tabId: string, bookDetail: BookDetail, type: PageType) => {
        if (cache[tabId]) {
            console.log('重复打开');
            return;
        }
        console.log('content 初始化:', bookDetail);

        const AppDom = document.createElement('div');
        AppDom.setAttribute('id', 'moyu-chrome-plugin-insert-pop');
        document.body.appendChild(AppDom);

        const app = createApp(App, { bookInfo: bookDetail, pageType: type });
        app.mount(AppDom);

        cache[tabId] = true;
    }
})();

const getBookBaseInfo = eventPromisefy('get-book-base-info');


if (ENV === "development") {
    window.onload = () => {
        window.chromeEvent.on('content-render', (bookInfo, type = PageType.Content) => initContentApp('demo', bookInfo, type));
    };
} else {
    // 监听 chrome message 通讯 
}