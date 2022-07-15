/**
 * chrome.tabs.sendMessage/connect 的模拟
 */
import { isDev } from './constant';

export enum ChannelType {
    Popup = "popup",
    Background = "background",
    Content = "content"
}

interface MessageData {
    request: any;
    sender: any;
    sendResponse: (data: any) => void;
}

export interface BaseMessage {
    onMessage: any;
    addListener: (callback: ({request, sender, sendResponse}: MessageData) => void) => void;
    sendMessage: (target: ChannelType, data: any) => void | Promise<any>;
}

// 模拟的本地 message
// 开发模式下可能会有多次监听的问题
class DevMessage implements BaseMessage {
    // 保存回调函数
    public list: Array<(parms: MessageData) => void>;
    // 构造函数
    constructor() {
        this.list = [];
    }
    // 事件监听
    public onMessage = { addListener: this.addListener.bind(this) }
    addListener(callback: ({request, sender, sendResponse}: MessageData) => void) {
        // 去重
        if (this.list.findIndex(cb => cb === callback) > -1) {
            return;
        }
        this.list.push(callback);
    }
    // 消息发送
    sendMessage(target: ChannelType, params: any) {
        return new Promise(res => {
            for (let cb of this.list) {
                // 这个现在这么写不合适
                cb({request: params, sender: {}, sendResponse: res});
            }
        });
    }
}

// 对 chrome.runtime message 机制的一层封装
class ChromeMessage implements BaseMessage {

    constructor() {};

    public onMessage = chrome.runtime.onMessage;

    addListener(callback: ({request, sender, sendResponse}: MessageData) => void) {
        chrome.runtime.onMessage.addListener(callback)
    }

    async sendMessage(target: ChannelType, data: any) {
        let response;
        if (target === ChannelType.Content) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            response = await chrome.tabs.sendMessage(tab.id, data);
        } else {
            response = await chrome.runtime.sendMessage(data);
        }
        return response
    }
}

let devMessage: DevMessage;

export const initMessageChannel = async (): Promise<BaseMessage> => {
    if (isDev) {
        if (!devMessage) {
            devMessage = new DevMessage();
        }
        return Promise.resolve(devMessage);
    } else {
       return new ChromeMessage();
    }
}