export interface IFanDialog {
    giftName?: string; // 礼物名称
    imageUrl?: string; // 宝箱图片
    quantity?: number; // 礼物数量
    starValue?: number; // 星光值
    state?: number; // 当前宝箱开启状态0-未解锁, 1-已领取, 2-已抢完, 3-未领取,4- 领取失败(非粉丝团成员)，5-领取失败(活动已结束), 6-领取成功
    type?: number; // 礼物类型
    coinType?: number; // 货币类型
}
