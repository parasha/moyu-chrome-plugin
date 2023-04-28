declare module '*.vue' {
  import { Component } from 'vue'
  const _default: Component
  export default _default
}

// 环境变量
declare const ENV: string;
declare const BIQUGE_DOMAIN: string;

// chrome 对象
declare const chrome: any;

