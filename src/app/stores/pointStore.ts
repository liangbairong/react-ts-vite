import { observable } from 'mobx';

export interface IPointStore {
    prizeInfo: any;
    isShowModal: boolean;
    setPrizeInfo: (value: any) => void;
    clearInfo: () => void;
}

const pendantStore = observable<IPointStore>({
    prizeInfo: null, // 选择参与夺宝的信息
    isShowModal: false,
    setPrizeInfo(value) {
        this.prizeInfo = value;
        this.isShowModal = true;
        return this;
    },
    clearInfo() {
        this.prizeInfo = null;
        this.isShowModal = false;
        return this;
    },
});
export default pendantStore;
