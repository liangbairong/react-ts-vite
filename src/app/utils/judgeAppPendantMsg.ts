export default class JudgeAppPendantMsg {
    index = 20; // 用于检测初始化数据达到倒计时计数器
    timer: number | undefined = undefined;

    constructor() {}

    /**
     * @param type 监听类型 pendant: 挂件 dialog: 弹窗
     * @param callback 回调函数
     */
    trigger(type: 'pendant' | 'dialog', callback: (appPendantMsg?: any) => any) {
        this.timer && window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            if (this.index < 0) {
                return;
            }
            if ((type === 'pendant' && window.appPendantMsg?.status === 200) || (type === 'dialog' && window.appPendantMsg?.resource)) {
                console.log(`类型 => ${type}, 返回参数 => ${JSON.stringify(window.appPendantMsg)}`);
                callback(window.appPendantMsg);
                window.clearTimeout(this.timer);
            } else {
                this.index--;
                this.trigger(type, callback);
            }
        }, 100);
    }
}
