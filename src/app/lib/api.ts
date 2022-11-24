import { http } from './http';
import { useFetch } from '../hooks';
import appStore from '../stores/appStore';
/* api统一定义 */
const api = {
    //积分任务
    useUpgradeTask(data: any) {
        return useFetch({
            url: '/ee/upgrade/task',
            method: 'post',
            data,
        });
    },

    // 竞猜时间轴
    useGuessTimeline(data = {}) {
        return useFetch({
            url: '/ee/guess/timeline',
            method: 'post',
            data,
        });
    },
    //点击时间轴节点
    useGuessTimelineNode(data: any, isRequest = false) {
        return useFetch({
            url: isRequest ? '/ee/guess/timelineNode' : null,
            method: 'post',
            data,
        });
    },

    //赛事竞猜详情
    useGuessTeamMatchDetail(data: any, isRequest = false) {
        return useFetch({
            url: isRequest ? '/ee/guess/teamMatchDetail' : null,
            method: 'post',
            data,
        });
    },

    //增加免错卡
    guessAddPardon() {
        return http({
            url: '/ee/guess/addPardon',
            method: 'post',
        });
    },

    //参与竞猜弹窗重新确认数据
    guessPrepare(data: any) {
        return http({
            url: '/ee/guess/prepare',
            method: 'post',
            data,
        });
    },

    //用户钱包
    guessAccount(data: any) {
        return http({
            url: '/ee/guess/account',
            method: 'get',
            data,
        });
    },
    //确认参与
    guessParticipate(data: any) {
        return http({
            url: '/ee/guess/participate',
            method: 'post',
            data,
        });
    },

    // 活动礼物
    guessGifts(data: any) {
        return useFetch({
            url: '/ee/guess/gifts',
            method: 'post',
            data,
        });
    },

    // 主播挑战主播信息
    useUpgradeChallenge(data: any) {
        return useFetch({
            url: '/ee/upgrade/challenge',
            method: 'post',
            data,
        });
    },
    //主播挑战 奖励记录
    useUpgradeSupportList(data: any) {
        return useFetch({
            url: '/ee/upgrade/supportList',
            method: 'post',
            data,
        });
    },
    //竞猜冠军球队
    useGuessGuessTeamPage(data: any) {
        return useFetch({
            url: '/ee/guess/guessTeamPage',
            method: 'post',
            data,
        });
    },
    //猜最佳球员页面
    useGuessGuessPlayerPage(data: any) {
        return useFetch({
            url: '/ee/guess/guessPlayerPage',
            method: 'post',
            data,
        });
    },

    //球队列表
    guessTeamList(data: any) {
        return http({
            url: '/ee/guess/teamList',
            method: 'post',
            data,
        });
    },
    //球员列表
    guessPlayerList(data: any) {
        return http({
            url: '/ee/guess/playerList',
            method: 'post',
            data,
        });
    },

    //用户已参与的竞猜记录
    guessParticipatedRecord(data: any) {
        return http({
            url: '/ee/guess/participatedRecord',
            method: 'post',
            data,
        });
    },

    //用户已参与的竞猜记录
    guessSuccessfulRecord(data: any) {
        return http({
            url: '/ee/guess/successfulRecord',
            method: 'post',
            data,
        });
    },

    // 首页用户信息
    getIndexDetail(data: any) {
        return useFetch({
            url: '/ee/index/detail',
            method: 'post',
            data,
        });
    },
    // 榜单整体时间轴
    getTimes(data: any) {
        return useFetch({
            url: '/ee/rank/times',
            method: 'post',
            data,
        });
    },
    // 足球宝贝日榜
    getAnchorDailyList({ data, isRequest = 0 }: { data: any; isRequest: number }) {
        return useFetch({
            url: isRequest ? '/ee/rank/anchorDailyList' : null,
            method: 'post',
            data,
        });
    },
    // 疯狂球迷日榜
    getUserDailyList({ data, isRequest = 0 }: { data: any; isRequest: number }) {
        return useFetch({
            url: isRequest ? '/ee/rank/userDailyList' : null,
            method: 'post',
            data,
        });
    },
    // 疯狂球迷总榜
    getUserTotalList(data: any) {
        return useFetch({
            url: '/ee/rank/userTotalList',
            method: 'post',
            data,
        });
    },
    // 获取主播区域
    getAnchorLiveRegion(data: any) {
        return http({
            url: '/ee/region/get',
            method: 'post',
            data,
        });
    },
    // 直播答题接口
    useGetAnswerIndex(data: any) {
        return useFetch({
            url: '/ee/answer/index',
            method: 'post',
            data,
        });
    },
    // 预约
    getAnswerOrder(data: any) {
        return http({
            url: '/ee/answer/order',
            method: 'post',
            data,
        });
    },
    // 助力详情
    answerAssistDetail(data: any) {
        return http({
            url: '/ee/answer/assistDetail',
            method: 'post',
            data,
        });
    },
    // 账户信息查询
    useGetAnswerOrder(data: any) {
        return useFetch({
            url: '/ee/withdrawal/account',
            method: 'post',
            data,
        });
    },
    // 助力
    answerAssist(data: any) {
        return http({
            url: '/ee/answer/assist',
            method: 'post',
            data,
        });
    },
    // 提现
    getWithdrawalDraw(data: any) {
        return http({
            url: '/ee/withdrawal/draw',
            method: 'post',
            data,
        });
    },
    answerAssistTarget(data: any) {
        return http({
            url: '/ee/answer/assistTarget',
            method: 'post',
            data,
        });
    },
    // 新增或更新银行账户
    saveBankAccountInfo(data: any) {
        return http({
            url: '/ee/withdrawal/bankAccount/saveOrUpdate',
            method: 'post',
            data,
        });
    },
    answerAssistRecords(data: any) {
        return http({
            url: '/ee/answer/assistRecords',
            method: 'get',
            data,
        });
    },
    // 银行账户信息查询
    getBankAccountInfo(data: any) {
        return useFetch({
            url: '/ee/withdrawal/bankAccount',
            method: 'post',
            data,
        });
    },
    // 赏金明细
    useGetMoneyRecords(data: any) {
        return useFetch({
            url: '/ee/withdrawal/moneyRecords',
            method: 'post',
            data,
        });
    },
};

export default api;
