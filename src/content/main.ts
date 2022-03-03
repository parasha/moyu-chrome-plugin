import '@/common/less/reset.less';

import { createApp } from "vue";
import { createPinia }from 'pinia';
import { PageType, BookDetail } from '@/definitions/content';
import { initMessageChannel, ChannelType } from '@/common/js/message';
import App from './App.vue';

//  实例化app
const initApp = (() => {
    let cache = null;

    return (initData: BookDetail, port: any) => {
        if (cache) {
            console.log('重复打开');
            return;
        }

        const AppDom = document.createElement('div');
        AppDom.setAttribute('id', 'moyu-chrome-plugin-insert-pop');
        document.body.appendChild(AppDom);

        const app = createApp(App, { initData, port });
        app.use(createPinia());
        app.mount(AppDom);

        cache = true;

        return app;
    }
})();

// 注册 Message Channel
const initChannelBetweenContentWithBackground = async () => {
    const port = await initMessageChannel(ChannelType.Content);
    let app;
    // 事件注册
    port.addListener(({ type, value }) => {
        switch (type) {
            case 'render':
                app = initApp(value, port);
                break;
        }
    });
}

/**
 * initContent 要做两件事：
 * 1. 实例化 App
 * 2. 获取小说的基本信息
 */
initChannelBetweenContentWithBackground();