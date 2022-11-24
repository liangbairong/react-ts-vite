/** all api Types */

/* === 礼包弹窗&挂件 ===  */
export type GiftPopupInfo = {
    businessId: string;
    coinType: number; // 货币类型，1：象豆。0：小象币
    eleCoin: number; // 小象币
    image: string;
    medalName: string; // 奖品名称
    medalType: number; // 奖品类型
    num: number; // 数量
    time: number; // 有效期（小时）
};
export type GiftPackPopup = {
    businessId: string;
    code: number; // 状态码：0:成功, 1:参数错误, 2:重复领取 5:未登录, 6:领取失败，7：活动未开始，10：活动已结束
    startTime: number;
    endTime: number; // 活动结束时间
    giftBagValue: number; // 礼包价值
    list: Array<GiftPopupInfo>;
    state: number; // 是否已经购买：0：未领取；1：已领取
    status: number; // 活动开始状态；0：未开始；1：已开始；10:已结束
    uid: string;
    anchorId: string | null;
    avatar: string;
};

// 主播挑战挂件数据
export type AnchorChallengePandant = {
    complete: number; // 0 未完成最高挑战 1 已完成最高等级
    level: number; //           等级
    needIntegral: number; //    需要星光值
    num: number; //	            已完成次数
    perIntegral: number; //	    每收集星光值
    roundEndTime: number; //    本轮结束时间
    state: number; //           活动状态：number未开始，1进行中，1number已结束
    team: {
        icon: string; //        球队icon
        id: string; //          球队id
        name: Record<string, string>; // 球队名称
        selectState: number; // 是否已经选择球队 1已选择 number未选择	integer
    }; // 选择的球队信息
};
// 球队列表
export type TeamList = {
    id: number; // 赛事ID
    teamA: {
        icon: string;
        id: string;
        name: string;
    }; // 主队
    teamB: {
        icon: string;
        id: string;
        name: string;
    }; // 客队
}[];

/* === 积分兑换 ===  */
export type PointExchangeIndex = {
    activityEndTime: number;
    activityStartTime: number; // 活动开始时间
    endMilli: number; // 距活动结束endMilli毫秒
    prizeList: Array<{
        coinType: number; //    货币类型 number 小象币 1 象豆
        description: string;
        exchange: boolean; //   是否可兑换
        exchangeNum: number; // 可兑换数量
        id: number;
        num: number; //         奖品数量
        picUrl: string; //      奖品图片
        prize: number; //       奖品价值
        prizeId: string; //     奖品编号
        prizeName: string; //   奖品名称
        prizeType: number; //   奖品类型,0:道具;1:礼物;2:象币；3象豆
        stock: number; //       奖品库存总数
        stockSurplus: number; //奖品剩余库存
        threshold: number; //   兑换所需积分
    }>; // 奖品列表
    status: number; // 活动状态：0未开始，1进行中，1number已结束
};
type PointRecordItem = {
    coinType: number; //    货币类型 0:小象币 1:象豆
    integral: number; //    消耗积分
    num: number; //         奖品数量
    picUrl: string; //      奖品图片
    prize: number; //       奖品价值
    prizeName: string; //   奖品名称
    prizeType: number; //   奖品类型,1:礼物;2:头像框;3:用户勋章
    time: number; //        参与时间
};
export type PointRecord = Array<PointRecordItem>;

/* === 积分夺宝 === */
export type PointBetIndex = {
    activityEndTime: number;
    activityStartTime: number;
    itemList: Array<{
        coinType: number; // 货币类型，1：象豆。0：小象币
        endMilli: number; // 开奖结束时间毫秒
        hadBetIntegral: number; // 已下注积分
        needIntegral: number; // 距开奖还需needIntegral积分
        num: number; // 奖品数量
        picUrl: string;
        prize: number;
        prizeId: string;
        prizeName: string;
        prizeType: number; // 奖品类型,1:礼物;2:头像框;3:用户勋章
        threshold: number; // 开奖所需积分
    }>;
    status: number; // 活动状态：number未开始，1进行中，1number已结束
    userIntegral: number; // 当前用户积分
};
export type PointBetRecord = {
    countId: string;
    current: number;
    hitCount: boolean;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: Array<{
        asc: boolean;
        column: string;
    }>;
    pages: number;
    records: Array<PointRecordItem>;
    searchCount: boolean;
    size: number;
    total: number;
};
export type PointBetResult = {
    coinType: number; //    货币类型 0:小象币 1:象豆
    num: number; //         奖品数量
    picUrl: string; //      奖品图片
    prize: number; //       奖品价值
    prizeName: string; //   奖品名称
    prizeType: number; //   奖品类型,1:礼物;2:头像框;3:用户勋章
    time: number; //        参与时间
    status: number; //      number:未能开奖,1:未中奖,2:已中奖
    totalIntegral: number; // 总参与积分
}[];

// 夺宝日程
export type PointBetSchedule = {
    date: string;
    itemList: {
        coinType: number;
        endMilli: number; // 开奖结束时间毫秒
        hadBetIntegral: number; // 已下注积分
        needIntegral: number; // 距开奖还需needIntegral积分
        num: number; // 奖品数量
        picUrl: string;
        prize: number;
        prizeId: string;
        prizeName: string;
        prizeType: number;
        threshold: number; // 开奖所需积分
    }[]; // 今日宝物
}[];
export type PointBetWinner = {
    num: 0;
    picUrl: '';
    prize: 0;
    prizeName: '';
    prizeType: 0;
    time: 0;
    userNickname: '';
}[];

/* === 限时秒杀 === */
export type ListSeckill = {
    activityEndTime: number;
    activityStartTime: number;
    endMilli: number;
    prizeList: {
        availableNum: number;
        coinType: number;
        id: number;
        integral: number;
        num: number;
        picUrl: string;
        prize: number;
        prizeName: string;
        prizeType: number;
        stockQuantity: number;
        stockSurplus: number;
        userLimit: number;
        validHour: number;
    }[];
    status: number;
};
export type ScheduleSeckill = {
    endTime: number;
    roundId: number;
    startTime: number;
    status: number; // 10已过期 0 未开始 1进行中
}[];
