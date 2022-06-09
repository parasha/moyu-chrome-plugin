import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './src/dev.html')
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  plugins: [
    react(),
    vue(), // 提供 vue 单文件组件支持
    vueJsx(), // 提供 jsx 支持
  ]
});
