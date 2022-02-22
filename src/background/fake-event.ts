class EventEmitter {
  // 存放 on 绑定的事件函数
  event: {
    [eventName: string]: Array<() => void>;
  };

  constructor() {
    // 初始化
    this.event = {};
  }

  on(eventName, callback) {
    this.event[eventName].push(callback);
  }

  emit(eventName) {
    const cbList = this.event[eventName];

    for (let cb of cbList) {
      cb();
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

window.chromeEvent = new EventEmitter();
