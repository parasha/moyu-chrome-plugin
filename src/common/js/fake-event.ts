class EventEmitter {
  // 存放 on 绑定的事件函数
  event: {
    [eventName: string]: Array<(...arg: any[]) => void>;
  };

  constructor() {
    // 初始化
    this.event = {};
  }

  on(eventName, callback) {
    if(!this.event[eventName]){
      this.event[eventName] = [];
    }
    this.event[eventName].push(callback);
  }

  emit(eventName, ...args) {
    const cbList = this.event[eventName];
    for (let cb of cbList) {
      cb(...args);
    }
  }

  remove(eventName, target) {
    const cbList = this.event[eventName];

    for (let i = 0; i < cbList.length; i++) {
      const cb = cbList[i];

      if (cb === target) {
        delete this.event[eventName][i];
      }
    }
  }
}

if (ENV === "development") {
  window.chromeEvent = new EventEmitter();
}