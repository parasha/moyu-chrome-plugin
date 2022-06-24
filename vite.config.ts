import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'


export default ({ mode }) => defineConfig({
  // build: {
  //   rollupOptions: {
  //     input: {
  //       index: resolve(__dirname, './src/dev.html')
  //     },
  //   }
  // },
  server: {
    proxy: {
      '/biquge-api': {
        target: 'https://www.shuquge.com',
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/biquge-api/, ""),
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  plugins: [
    vue(), // 提供 vue 单文件组件支持
    vueJsx(), // 提供 jsx 支持
    // 提供样式的按需导入
    createStyleImportPlugin({
      resolves: [VantResolve(),]
    }),
  ]
});
