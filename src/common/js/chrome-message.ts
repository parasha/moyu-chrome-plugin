/**
 * chrome.tabs.sendMessage/chonnect 的模拟
 */
import {isDev} from './constant';

export enum ChannelType {
    Background = 'background',
    Content = 'content'
}

// 模拟的本地 message
class DevMessage {
    public list: Array<(params: any) => void>;
    public onMessage = { addListener: this.addListener }
    // 构造函数
    constructor() {
        this.list = [];
    }
    // 事件监听
    addListener(callback: (params: any) => void) {
        // 去重
        if (this.list.findIndex(cb => cb === callback) > -1) {
            return;
        }
        this.list.push(callback);
    }
    // 消息发送
    postMessage(params: any) {
        for (let cb of this.list) {
            cb(params);
        }
    }
    // 断开连接
    disconnect() {
        // dev 模式不需要这个
        console.log('切断链接');
    }
}


// content 链接
const promisefyContentConnect = () => {
    return new Promise(res => {
        chrome.runtime.onConnect.addListener(function (port: any) {
            res(port);
        })
    })
}

// background 链接
const promiseBackgroundGetCurrentTab = () => {
    return new Promise(res => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
            if (tabs.length) {
                res(tabs[0].id)
            }
        });
    });
}

export const initMessageChannel = async (type: ChannelType): Promise<any> => {
    if (isDev) {
        return Promise.resolve(new DevMessage());
    } else {
        if (type === ChannelType.Background) {
            const tabId = await promiseBackgroundGetCurrentTab();
            const promisePort = chrome.tabs.connect(tabId, { name: `tab-${tabId}` });
            return promisePort
        } else {
            const promisePort = await promisefyContentConnect() as any;
            return promisePort;
        }
    }
}