import '@/common/less/reset.less';

import { createApp } from "vue";
import { PageType, BookDetail } from '@/definitions/content';
import { initMessageChannel, ChannelType } from '@/common/js/message';
import App from './App.vue';

//  实例化app
const initApp = (() => {
    let cache = null;

    return ( bookDetail: BookDetail, type: PageType) => {
        if (cache) {
            console.log('重复打开');
            return;
        }

        const AppDom = document.createElement('div');
        AppDom.setAttribute('id', 'moyu-chrome-plugin-insert-pop');
        document.body.appendChild(AppDom);

        const app = createApp(App, { bookInfo: bookDetail, pageType: type });
        app.mount(AppDom);

        cache = true;
    }
})();

// 注册 Message Channel
const initChannelBetweenContentWithBackground = async () => {
    const port = await initMessageChannel(ChannelType.Content);

    // 事件注册
    port.addListener(({ type, value }) => {
        switch (type) {
            case 'render':
                // const {  bookId, bookTitle } = value;
                initApp( value, type);
                break;
            default:
                console.log('content listener:', type, value);
        }
    });
}



/**
 * initContent 要做两件事：
 * 1. 实例化 App
 * 2. 获取小说的基本信息
 */
initChannelBetweenContentWithBackground();