import { createApp } from "vue";
import App from './App.vue';
import { initMessageChannel } from '@/common/js/chrome-message';
import { Chapter } from '@/definitions/book';

const port = await initMessageChannel();

const insertWindow = (defaultChapter: Chapter) => {
  const oldDom = document.querySelector('#moyu-chrome-chrome-plugin-insert-container')
  if (oldDom) {
    document.body.removeChild(oldDom);
  }
  const AppDom = document.createElement('div');
  AppDom.setAttribute('id', 'moyu-chrome-chrome-plugin-insert-container');
  document.body.appendChild(AppDom);

  const app = createApp(App, { chapter: defaultChapter });
  app.provide('port', port);
  app.mount(AppDom);
};

port.addListener(({ request }) => {
  const { type, value } = request;
  if (type === 'open-book') {
    insertWindow(value);
  }
});
