import Mock from 'mockjs';
const Random = Mock.Random;
const mocks = [
    //积分夺宝-主页
    {
        url: '/integralShop/loot/index',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                data: {
                    activityEndTime: Date.now() + 1028891829,
                    activityStartTime: Date.now(),
                    'itemList|4-10': [
                        {
                            'coinType|0-1': 0,
                            endMilli: Date.now() + 293022,
                            hadBetIntegral: 1110,
                            needIntegral: 3000,
                            num: 10,
                            picUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                            prize: 100,
                            prizeId: /\d{5,10}/,
                            prizeName: Random.first(),
                            'prizeType|1-3': 1,
                            threshold: Random.natural(1000, 20000),
                        },
                    ],
                    status: Random.pick([0, 1, 10]),
                    userIntegral: Random.natural(6000, 15100),
                },
            };
        },
    },
    //积分夺宝-下注
    {
        url: '/integralShop/loot/bet',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                data: {
                    //  200-成功 40001-活动结束/已开奖 40002-积分余额不足 40003-已开奖
                    code: 0,
                },
            };
        },
    },
    //积分夺宝-宝物日程
    {
        url: '/integralShop/loot/schedule',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                'data|3-8': [
                    {
                        date: Random.date(),
                        'itemList|2-4': [
                            {
                                'coinType|0-1': 0,
                                endMilli: Date.now(),
                                hadBetIntegral: Random.natural(1260, 1500),
                                needIntegral: Random.natural(1260, 5400),
                                num: Random.natural(60, 100),
                                picUrl: Random.image(),
                                prize: Random.natural(100, 1000),
                                prizeId: /\d{5,10}/,
                                prizeName: Random.first(),
                                'prizeType|1-3': 1,
                                threshold: Random.natural(6000, 111100),
                            },
                        ],
                    },
                ],
            };
        },
    },
    //积分夺宝-参与记录
    {
        url: '/integralShop/loot/record',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                data: {
                    countId: '',
                    current: 0,
                    hitCount: true,
                    maxLimit: 0,
                    optimizeCountSql: true,
                    orders: [
                        {
                            asc: true,
                            column: '',
                        },
                    ],
                    pages: 0,
                    'records|1-4': [
                        {
                            'coinType|0-1': 0,
                            integral: 0,
                            num: Random.natural(100, 1000),
                            picUrl: Random.image(),
                            prize: Random.natural(100, 1000),
                            prizeName: Random.first(),
                            'prizeType|1-3': 1,
                            time: Random.datetime(),
                        },
                    ],
                    searchCount: true,
                    size: 0,
                    total: 0,
                },
            };
        },
    },
    //积分夺宝-夺宝结果
    {
        url: '/integralShop/loot/result',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                'data|1-8': [
                    {
                        'coinType|0-1': 0,
                        num: Random.natural(100, 1000),
                        picUrl: Random.image(),
                        prize: Random.natural(100, 1000),
                        prizeName: Random.first(),
                        'prizeType|1-3': 1,
                        'status|0-2': 0,
                        totalIntegral: Random.natural(100, 1000),
                    },
                ],
            };
        },
    },
    //积分夺宝-幸运用户
    {
        url: '/integralShop/loot/winners',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                'data|1-8': [
                    {
                        num: Random.natural(100, 1000),
                        picUrl: Random.image(),
                        prize: Random.natural(100, 1000),
                        prizeName: Random.first(),
                        'prizeType|1-4': 1,
                        time: Random.now(),
                        userNickname: Random.name(),
                    },
                ],
            };
        },
    },

    //积分兑换-主页
    {
        url: '/integralShop/exchange/index',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                data: {
                    activityEndTime: Date.now() + 102121829,
                    activityStartTime: Date.now(),
                    endMilli: Date.now() + 293022,
                    'prizeList|4-10': [
                        {
                            'coinType|0-1': 0,
                            exchange: Random.boolean(),
                            exchangeNum: Random.natural(100, 900),
                            id: Random.id(),
                            num: Random.natural(200, 2000),
                            picUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                            prize: Random.natural(100, 900),
                            prizeId: /\d{5,10}/,
                            prizeName: Random.first(),
                            'prizeType|1-3': 1,
                            threshold: Random.natural(1000, 20000),
                            stock: Random.natural(1000, 20000),
                            stockSurplus: Random.natural(200, 2000),
                        },
                    ],
                    status: Random.pick([0, 1, 10]),
                },
            };
        },
    },
    //积分兑换-兑换记录
    {
        url: '/integralShop/exchangeRecord',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                'data|3-8': [
                    {
                        'coinType|0-1': 0,
                        integral: 0,
                        num: Random.natural(100, 1000),
                        picUrl: Random.image(),
                        prize: Random.natural(100, 1000),
                        prizeName: Random.first(),
                        'prizeType|1-3': 1,
                        time: Random.datetime(),
                    },
                ],
            };
        },
    },
];

export default mocks;
