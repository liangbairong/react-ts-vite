import { EventHandler } from 'react';
//
// export type IPStoreProp = {
//     actEndTime: number;
//     show: boolean;
//     init: boolean;
// };
//
// export type IInitProps = {
//     startTime: number;
//     endTime: number;
// };
//
// export interface IFormatProps {
//     currentTime: number; // 当前时间戳
//     pendantStartTime?: number;
//     pendantEndTime?: number;
// }
//
// export type CharmProps = {
//     curLevel: number; // 当前等级
//     nextLevel: number; // 下一等级
//     progressBarNeed: number; // 距离下级还需要的福气值
//     progressBarTotal: number; // 下一等级对应的福气总值
//     endTime: number; // 活动结束时间
//     state: number; // 活动状态
//     num: number;
// };
// export type ReqEnvelopeProps = {
//     coinTotal: number; // 小象币总额
//     openTime: number; // 派发红包时间
//     unlock: boolean;
//     eventTime: number; // 当前时间戳
//     progressBarNeed: number;
//     progressBarTotal: number;
// };
//
// export interface AnchorProps extends IFormatProps {
//     reqEnvelope?: ReqEnvelopeProps;
//     charm?: CharmProps;
//     endTime: number;
//     status: number;
// }
//
// export type PendantProp = {
//     initData: IInitProps | null;
//     formatData: null;
// };
//
// export type ITimerProp = {
//     expireTime: number;
//     currentTime: number;
//     onHandCountDownEvent: EventHandler<any>;
// };
//
// export interface RedProps extends IFormatProps {
//     amount: number;
//     expireTime: number;
//     id: number | string;
//     state: number;
//     currentTime: number;
// }

interface BaseIProps {}

export interface IProps extends BaseIProps {}
type timerProps = {
    endTime: number;
    startTime: number;
    timestamp: number;
};
export type CProps = {
    state: number;
    data: timerProps;
    onCountDown: EventHandler<any>;
};

export type ISigUp = {
    info: any;
    onRefresh?: Function | any;
    currentTime?: number;
};

export interface IRanking {
    rank?: number | string;
}

export type IChildren = {
    info?: any;
    state?: number;
};
export type IGroupBox = {
    group?: number; // 当前所属分组id，1草莓，2水蜜桃，3橙子
    phase?: number; // 当前阶段1，2，3，需要先判断活动整体状态state
};

export interface IRankOther extends IRanking {
    gapNum?: number; // 距离上下名次差值
    type?: number; // 1为上一名,2为下一名参数
}
