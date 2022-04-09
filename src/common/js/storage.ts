const isDev = ENV === "development";

// 不知道为什么，promisefy 不能用
const promisefy = <T>(fn): ((...arg: any) => Promise<T>) => {
  return (...rest) => {
    return new Promise((res, rej) => {
      fn(
        ...rest,
        (arg1: T) => {
          res(arg1);
        },
        (arg2) => {
          rej(arg2);
        }
      );
    });
  };
};

export const get = <T>(key: string): Promise<T> => {
  if (isDev) {
    return new Promise((resolve) => {
      const res = localStorage.getItem(key);
      resolve(JSON.parse(res));
    });
  } else {
    // return promisefy<T>(chrome.storage.sync.get)(key);
    return new Promise(res => {
      chrome.storage.sync.get(key, (result) => {
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
    // return promisefy(chrome.storage.sync.set)({ [key]: value });
    return new Promise(res => {
      chrome.storage.sync.set({[key]: value}, (result) => {
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
    // return promisefy(chrome.storage.sync.remove)(key);
    return new Promise(res => {
      chrome.storage.sync.remove(key, (result) => {
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
    // return promisefy(chrome.storage.sync.clear)();
    return new Promise(res => {
      chrome.storage.sync.clear((result) => {
        res(result);
      })
    });
  }
};
