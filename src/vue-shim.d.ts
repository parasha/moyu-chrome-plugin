declare module '*.vue' {
  import { Component } from 'vue'
  const _default: Component
  export default _default
}

// window
declare interface Window {
  bg: any;
}

// 环境变量
declare const ENV: string;
declare const BIQUGE_DOMAIN: string;

// 浏览器
declare const chrome: any;