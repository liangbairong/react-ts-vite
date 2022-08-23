// import { get, post } from "./request";
import {useFetch,http} from './http'
/* api统一定义 */
const api = {
    //挂件
    getPendantInfo(option = {}) {
        return post({
            url: "/ee/loveRank/pendant",
            data: option
        });
    },

    // 立即购买
    buyNow(option = {}) {
        return post({
            url: "/package/order",
            data: option
        });
    },

    // 是否新人
    isNewcomer(option = {}) {
        return post({
            url: "/ee/isNewcomer/index",
            data: option
        });
    },

    //礼包
    getGiftBag(option = {}) {
        return post({
            url: "/package/popup",
            data: option
        });
    },

    //心动约会、告白时刻
    getTaskList(option = {}) {
        return get({
            url: "/ee/taskList/index",
            params: option
        });
    },

    //上一轮最强助力
    getPrevRoundDetail(option = {}) {
        return get({
            url: "/ee/loveRank/prevRoundDetail",
            params: option
        });
    },

    //日榜时间轴
    getTimeline(option = {}) {
        return post({
            url: "/ee/loveRank/timeLine",
            data: option
        });
    },



    //幸运儿记录
    getLuckyRecord(option = {}) {
        return post({
            url: "/ee/luckyRecord/index",
            data: option
        });
    },

    //幸运儿
    getLuckyDetail(option = {}) {
        return post({
            url: "/ee/luckyDetail/index",
            data: option
        });
    },
    getTwGeneralList(option = {}) {
        return get({
            url: "/ee/loveRank/getTwGeneralList",
            params: option
        })
    },

    //new
    //轮次
    roundTimeList(option = {}) {
        return get({
            url: '/ee/roundTime/list',
            params: option,
        });
    },

    //爱意榜
    loveRankList(data = {}) {
        return useFetch({
            url: "/ee/loveRank/index",
            method: 'get',
            data,
        })
    },

    //守护榜
    richRankList(option = {}) {
        return get({
            url: '/ee/richRank/index',
            params: option,
        });
    },
};

export default api;
