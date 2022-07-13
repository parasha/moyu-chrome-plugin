import { isDev } from './constant';

export const get = <T>(key: string): Promise<T | undefined> => {
    if (isDev) {
        return new Promise((resolve) => {
            const res = localStorage.getItem(key);
            resolve(res ? JSON.parse(res) : undefined);
        });
    } else {
        return new Promise(res => {
            chrome.storage.sync.get(key, (result: {[key: string]: T}) => {
                res(result[key]);
            })
        });
    }
};

export const set = (key: string, value: any) => {
    if (isDev) {
        return new Promise((res) => {
            localStorage.setItem(key, JSON.stringify(value));
            res(true);
        });
    } else {
        return new Promise(res => {
            chrome.storage.sync.set({ [key]: value }, (result: any) => {
                res(result);
            })
        });
    }
};

export const remove = (key: string) => {
    if (isDev) {
        return new Promise((res) => {
            localStorage.removeItem(key);
            res(true);
        });
    } else {
        return new Promise(res => {
            chrome.storage.sync.remove(key, (result: any) => {
                res(result);
            })
        });
    }
};

export const clear = () => {
    if (isDev) {
        return new Promise((res) => {
            localStorage.clear();
            res(true);
        });
    } else {
        return new Promise(res => {
            chrome.storage.sync.clear((result: any) => {
                res(result);
            })
        });
    }
};
