import { useFetch } from '../hooks';
import { http } from './http';
import { PointExchangeIndex, PointRecord, PointBetIndex, PointBetRecord, PointBetResult, PointBetSchedule, PointBetWinner, ListSeckill, ScheduleSeckill } from './api.types';

const pointStoreApi = {
    // 积分兑换
    async usePointExchange(data: { prizeId: string }) {
        return await http<{
            code: string; // 业务状态码 0000:成功;9999:系统错误;1001:活动未开始;1002:活动已结束;1003:已达兑换数量的上限;1004:积分不足;1005:剩余数量不足
            msg: string;
        }>({
            url: '/ee/integralShop/exchange',
            method: 'post',
            data,
        });
    },
    // 积分兑换主页
    usePointExchangeIndex() {
        return useFetch<PointExchangeIndex>({
            url: '/ee/integralShop/exchange/index',
            method: 'post',
        });
    },
    // 积分兑换记录
    usePointExchangeRecord(data: { num: number; page: number }) {
        return useFetch<PointRecord>({
            key: `/ee/integralShop/exchangeRecord?num=${data.num}&page=${data.page}`,
            url: '/ee/integralShop/exchangeRecord',
            method: 'post',
            data,
        });
    },
    // 积分夺宝-下注
    async usePointBet(data: {
        prizeId: string; // 奖品编号ID
        uid: string; // 用户ID
        value: number; // 下注积分
    }) {
        return await http<{
            code: number; // 200-成功 40001-活动结束/已开奖 40002-积分余额不足 40003-已开奖
        }>({
            url: '/ee/integralShop/loot/bet',
            method: 'post',
            data,
        });
    },
    // 积分夺宝主页
    usePointBetIndex() {
        return useFetch<PointBetIndex>({
            url: '/ee/integralShop/loot/index',
            method: 'get',
        });
    },
    // 积分夺宝-参与记录
    usePointBetJoinRecord(data: { num: number; page: number }) {
        return useFetch<PointBetRecord>({
            key: `/ee/integralShop/loot/record?num=${data.num}&page=${data.page}`,
            url: '/ee/integralShop/loot/record',
            method: 'get',
            data,
        });
    },
    // 积分夺宝-夺宝结果
    usePointBetResult() {
        return useFetch<PointBetResult>({
            url: '/ee/integralShop/loot/result',
            method: 'get',
        });
    },
    // 积分夺宝-日程表
    usePointBetSchedule() {
        return useFetch<PointBetSchedule>({
            url: '/ee/integralShop/loot/schedule',
            method: 'get',
        });
    },
    // 积分夺宝-幸运用户
    usePointBetWinner() {
        return useFetch<PointBetWinner>({
            url: '/ee/integralShop/loot/winners',
            method: 'get',
        });
    },
    // 限时秒杀-兑换
    async useTimeSeckillExchange(data: { prizeId: number }) {
        return await http<{
            code: string; // 业务状态码 0000:成功;9999:系统错误;1001:活动未开始;1002:活动已结束;1003:已达兑换数量的上限;1004:积分不足;1005:剩余数量不足
            msg: string;
        }>({
            url: '/ee/integralShop/seckill',
            method: 'post',
            data,
            noErrorToast: true,
        });
    },
    // 限时秒杀-商品列表
    async useListSeckill(data: { roundId: number }) {
        return await http<ListSeckill>({
            url: '/ee/integralShop/seckill/itemList',
            method: 'get',
            data,
        });
    },
    // 现实秒杀-日程时间
    useScheduleSeckill() {
        return useFetch<ScheduleSeckill>({
            url: '/ee/integralShop/seckill/schedule',
            method: 'get',
        });
    },
};

export default pointStoreApi;
