

class DevMessage {

    public list: Array<(params: any) => void>

    constructor() {
        this.list = [];
    }

    addListener(callback: (params: any) => void) {
        // dev 模式下会有事件重复注册问题
        // 本身就是一个开发调试模拟的，对付对付就行
        this.list.push(callback);
    }

    postMessage(params: any) {
        for (let cb of this.list) {
            cb(params);
        }
    }

    disconnect() {
        console.log('切断链接');
    }
}

export default DevMessage;