import { observable } from 'mobx';
import api from '../lib/api';

interface ICard {
    buff: number;
    freeError: number;
}

export interface IQpStore<T = any> {
    curType: number;
    setCurType: (value: T) => void;
    userWallet: T;
    setUserWallet: (value: T) => void;
    getUserWallet: () => void;
    curDayData: T;
    setCurDayData: (value: T) => void;
    status: number;
    setStatus: (value: number) => void;
    team: T;
    setTeam: (value: T) => void;
    betTitle: T;
    setBetTitle: (value: T) => void;
    betItem: T;
    setBetItem: (value: T) => void;
    participateNum: number;
    setParticipateNum: (value: number) => void;
    participateType: number;
    setParticipateType: (value: number) => void;
    card: ICard;
    setCard: (value: ICard) => void;
}

const qpStore = observable<IQpStore>({
    curType: 0,
    setCurType(value) {
        this.curType = value;
        return this;
    },
    userWallet: {},
    setUserWallet(value) {
        this.userWallet = value;
        return this;
    },
    getUserWallet() {
        api.guessAccount({}).then((res) => {
            this.userWallet = res;
        });
    },
    // 当日数据
    curDayData: {},
    setCurDayData(value) {
        this.curDayData = value;
        return this;
    },
    //活动状态
    status: 0,
    setStatus(value) {
        this.status = value;
        return this;
    },
    // 当前场次比赛
    team: {},
    setTeam(value) {
        this.team = value;
        return this;
    },
    //竞猜胜负
    // 选中下注的数据
    betTitle: {},
    setBetTitle(value) {
        this.betTitle = value;
        return this;
    },
    // 选中下注的数据
    betItem: {},
    setBetItem(value) {
        this.betItem = value;
        return this;
    },
    // 下注数量
    participateNum: 0,
    setParticipateNum(value) {
        this.participateNum = value;
        return this;
    },
    // 下注类型
    participateType: 1,
    setParticipateType(value) {
        this.participateType = value;
        return this;
    },
    //  使用道具
    card: {
        buff: 0,
        freeError: 0,
    },
    setCard(value) {
        this.card = value;
        return this;
    },
});
export default qpStore;
