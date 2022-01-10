const isDev = ENV === "development";

const promisefy = (fn) => {
  return (...rest) => {
    return new Promise((res, rej) => {
      fn(
        ...rest,
        (arg1) => {
          res(arg1);
        },
        (arg2) => {
          rej(arg2);
        }
      );
    });
  };
};

export const get = (key) => {
  if (isDev) {
    return new Promise((resolve) => {
      const res = localStorage.getItem(key);
      resolve(res);
    });
  } else {
    return promisefy(chrome.storage.sync.get)(key);
  }
};

export const set = (key, value) => {
  if (isDev) {
    return new Promise((res) => {
      localStorage.setItem(key, value);
      res(true);
    });
  } else {
    return promisefy(chrome.storage.sync.set)({ [key]: value });
  }
};

export const remove = (key) => {
  if (isDev) {
    return new Promise((res) => {
      localStorage.removeItem(key);
      res(true);
    });
  } else {
    return promisefy(chrome.storage.sync.remove)(key);
  }
};

export const clear = () => {
  if (isDev) {
    return new Promise((res) => {
      localStorage.clear();
      res(true);
    });
  } else {
    return promisefy(chrome.storage.sync.clear)();
  }
};
