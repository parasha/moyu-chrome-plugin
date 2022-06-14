/// <reference types="vite/client" />

declare module '*.vue' {
    import { Component } from 'vue'
    const _default: Component
    export default _default
}

declare const chrome: {[key: string]: any};