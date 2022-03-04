import DevMessage from "./dev-message";

export enum ChannelType {
    Background = 'background',
    Content = 'content'
}

// content 链接
const promisefyContentConnect = () => {
    return new Promise(res => {
        chrome.runtime.onConnect.addListener(function (port) {
            res(port);
        })
    })
}

// background 链接
const promiseBackgroundGetCurrentTab = () => {
    return new Promise(res => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length) {
                res(tabs[0].id)
            }
        });
    });
}


let port;
if(ENV === 'development'){
    port = new DevMessage();
}

export const initMessageChannel = async (type: ChannelType): Promise<any> => {
    if (ENV === 'development') {
        return Promise.resolve(port);
    } else {
        if (type === ChannelType.Background) {
            const tabId = await promiseBackgroundGetCurrentTab();
            const promisePort = chrome.tabs.connect(tabId, { name: tabId });
            return promisePort
        } else {
            const promisePort = await promisefyContentConnect();
            return promisePort;
        }
    }
}