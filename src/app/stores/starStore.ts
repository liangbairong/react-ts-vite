import { observable } from 'mobx';

import { isPlainObject } from '@Utils/index';

export interface IAnchorInfoProps {
    image?: string;
    liveState?: number;
    name?: string;
    recommend?: number;
    userId?: string;
    value?: number;
    lucker?: boolean;
}

export interface IUserInfoProps {
    image?: string;
    name?: string;
    recommend?: number;
    userId?: string;
    value?: number;
    lucker?: boolean;
}

export interface IAnchorItemProps<
    T extends IAnchorInfoProps = IAnchorInfoProps,
    C extends IUserInfoProps = IUserInfoProps
> {
    rank: number;
    anchorInfo: T;
    userInfo: C;
}

export interface IStarProps<T extends IAnchorItemProps = IAnchorItemProps> {
    list?: T[];
    currentRank?: T | null;
}

export interface IAnchorProps<T extends IStarProps = IStarProps> {
    anchorId: number | string;
    roundId: number | string;
    rankData: T;
}

export interface IRoundInfos {
    endDate: number; // 每轮结束日期
    prePromotionNum: number;
    promotionNum: number;
    roundId: string | number; // 场次id
    startDate: number; // 每轮开始日期
    settleEndTime: number; // 结算中时剩余结算时间。单位/秒
    state: number; // 状态：0 未开始，1 进行中，2 已结束
}

export interface IAnchorTimeLine<T extends IRoundInfos = IRoundInfos> {
    regionType: number; // 是否马来西亚，0: 马来西亚地区; 1: 非马来西亚地区
    roundInfos: T[]; // 场次信息
    state: number; // 状态：0 未开始，1 进行中，2 已结束
}
//
// export interface IAnchorOptions {
//   isOpen: boolean,
//   starId: string | undefined,
//   starName: string | undefined,
// }

export interface trackItem {
    label: string;
    value: string;
    path: string;
}

export interface StarStoreProps<
    T extends IAnchorTimeLine = IAnchorTimeLine,
    C extends IAnchorProps = IAnchorProps
> {
    loading: boolean;
    anchorOptions: Record<string, C>;
    anchorTimeline: T;
    setLoading: (value: boolean) => void;
    setListsData: (value: Record<string, any>) => void;
    setAnchorTimeline: (value: Record<string, any>) => void;
    refresh: number;
    pageRefresh: number;
    listsTitle: string[];
    currentRound: IRoundInfos;
    changeCurrentRound: (value: Record<string, any>) => void;

    // starId: string | unknown,
    // malaysia: number,
    // isStarAdmin: number,
    // roundId: number | unknown,
    // roundInfos: IRoundInfos,
    // anchorOptions: IAnchorOptions,
    // changeAnchorOptions: (value: Record<string, any>) => void,
    // changeRoundId: (value: number | unknown) => void,
    // changeRoundInfos: (value: IRoundInfos) => void,
    changeRefresh: (value: number) => void;
    changePageRefresh: (value: number) => void;
    // changeIsStarAdmin: (value: number) => void,
    // changeMalaysia: (value: number) => void,
    // changeStarId: (value: number | unknown) => void,
}

const starStore = observable<StarStoreProps>({
    loading: false,

    currentRound: {
        endDate: 0,
        prePromotionNum: 0,
        promotionNum: 0,
        roundId: 0,
        startDate: 0,
        state: 0,
        settleEndTime: 0,
    },

    anchorTimeline: {
        regionType: 0,
        roundInfos: [],
        state: 0,
    },

    anchorOptions: {
        // anchorId: '',
        // roundId: 0,
        // rankData: {
        //   list: [],
        //   currentRank: null
        // }
    },

    refresh: 0,

    pageRefresh: 0,

    listsTitle: ['Ranking', 'VJ', 'Strongesthelp'],

    setListsData(value) {
        if (isPlainObject(value)) {
            const { roundId } = this.currentRound;
            if (this.anchorOptions[roundId]) {
                Object.assign(this.anchorOptions, {
                    [roundId]: value,
                });
            } else {
                this.anchorOptions[roundId] = value;
            }
            // console.log( this.anchorOptions, value , 'userOptions')
        }
        return this;
    },

    setAnchorTimeline(value) {
        if (isPlainObject(value)) {
            Object.assign(this.anchorTimeline, value);
        }
        return this;
    },

    setLoading(value) {
        this.loading = value;
        return this;
    },

    changeRefresh(value) {
        if (this.refresh !== value) {
            this.refresh = value;
        }
        return this;
    },

    changePageRefresh(value) {
        if (this.pageRefresh !== value) {
            this.pageRefresh = value;
        }
        return this;
    },

    changeCurrentRound(value) {
        if (isPlainObject(value)) {
            Object.assign(this.currentRound, value);
        } else {
            this.currentRound = value;
        }
        return this;
    },
});

export default starStore;
