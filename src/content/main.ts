import { createApp } from "vue";
import { port } from './port';
import App from './App.vue';
import { Chapter } from '@/definitions/book';

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

port.onMessage.addListener(({ type, value }: { type: string, value: any }) => {
  if (type === 'open-book') {
    insertWindow(value);
  }
});