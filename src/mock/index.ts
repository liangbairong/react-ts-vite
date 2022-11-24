import Mock from 'mockjs';
const Random = Mock.Random;
const mocks = [
    //积分任务
    {
        url: '/ee/upgrade/task',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                status: 200,
                data: {
                    activityEndTime: Date.now() + 1000000,
                    activityStartTime: Date.now() + 10000,
                    avatar: 'http://120.77.176.134:9002/noble1.png',
                    endMilli: 0,
                    integral: 0,
                    nickName: '试试',
                    state: 0, //活动状态，0未开始，1进行中 2不存在 10 已结束
                    'taskList|6': [
                        {
                            'completeLimit|0-1': 0,
                            completeNum: 1,
                            'prizeNum|20-1000': 0,
                            rangeValue: 10,
                            state: 0,
                            targetValue: 300,
                            'taskType|1-6': 1,
                        },
                    ],
                    totalIntegral: 0,
                },
            };
        },
    },

    // 竞猜时间轴
    {
        url: '/ee/guess/timeline',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    nodeNames: ['11.18', '11.19', '11.20', '11.21', '11.22', '11.23', '11.24', '11.25', '11.26'],
                    currNodeName: '11.20',
                },
            };
        },
    },
    {
        url: '/ee/guess/timelineNode',
        method: 'post',
        timeout: 200,
        response: () => {
            return {
                status: 200,
                'data|1-4': [
                    {
                        currTime: Date.now(),
                        guessEndTime: Date.now() + 2000000,
                        guessStartTime: Date.now() - 200000,
                        hasResult: 0, //是否已有结果
                        'id|+1': 1,
                        startTime: 0,
                        teamA: {
                            icon: 'http://120.77.176.134:9002/noble1.png',
                            id: '1112',
                            name: '卡尔塔',
                        },
                        teamAScore: 1, //主队得分
                        teamB: {
                            icon: 'http://120.77.176.134:9002/noble1.png',
                            id: '3333',
                            name: '厄瓜多尔',
                        },
                        teamBScore: 2, //客队得分
                    },
                ],
            };
        },
    },
    //轮次赛事竞猜详情
    {
        url: '/ee/guess/teamMatchDetail',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    //猜比分
                    guessScore: {
                        'guessRecords|1-10': [
                            {
                                'bonusTimes|1-10': 0,
                                'participatedDiamond|100-1000': 0,
                                'participatedIntegral|100-1000': 0,
                                scoreStr: '1-2',
                                'usedBuffCard|0-1': 0,
                                'usedErrorFreeCard|0-1': 0,
                            },
                        ],
                        'scoreList|2-6': [
                            {
                                'bonusTimes|1-9': 0,
                                id: /\d{5,10}/,
                                scoreStr: '0-1',
                            },
                        ],
                    },
                    //猜单双
                    guessSingle: {
                        doubleNumOption: {
                            bonusTimes: 0,
                            id: /\d{5,10}/,
                            participatedDiamond: 0,
                            participatedIntegral: 0,
                            result: 0,
                            usedBuffCard: 0,
                            usedErrorFreeCard: 0,
                        },
                        singleNumOption: {
                            bonusTimes: 0,
                            id: /\d{5,10}/,
                            participatedDiamond: 0,
                            participatedIntegral: 0,
                            result: 0,
                            usedBuffCard: 0,
                            usedErrorFreeCard: 0,
                        },
                    },
                    //猜大小
                    guessSize: {
                        'guessSizeOptionList|1-4': [
                            {
                                'delimitValue|1-5': 0,
                                largeBallOption: {
                                    'bonusTimes|1-6': 0,
                                    id: /\d{5,10}/,
                                    participatedDiamond: 0,
                                    participatedIntegral: 0,
                                    'result|0-2': 0,
                                    'usedBuffCard|0-1': 0,
                                    'usedErrorFreeCard|0-1': 0,
                                },
                                smallBallOption: {
                                    'bonusTimes|1-6': 0,
                                    id: /\d{5,10}/,
                                    participatedDiamond: 0,
                                    participatedIntegral: 0,
                                    'result|0-2': 0,
                                    'usedBuffCard|0-1': 0,
                                    'usedErrorFreeCard|0-1': 0,
                                },
                            },
                        ],
                    },
                    //猜胜负
                    guessWin: {
                        'guessWinOptionList|1-3': [
                            {
                                'concedeBallNum|1-3': 1,
                                concedeBallTeam: '卡塔尔', //让球球队名称
                                teamAWinOption: {
                                    bonusTimes: 2,
                                    id: /\d{5,10}/,
                                    participatedDiamond: 1,
                                    participatedIntegral: 1,
                                    result: 2,
                                    winTeamName: '卡塔尔',
                                    // title: '卡塔尔胜',
                                    'usedBuffCard|0-1': 1,
                                    'usedErrorFreeCard|0-1': 0,
                                },
                                teamBWinOption: {
                                    bonusTimes: 1.2,
                                    id: /\d{5,10}/,
                                    participatedDiamond: 0,
                                    participatedIntegral: 0,
                                    result: 2,
                                    winTeamName: '厄瓜多尔',
                                    // title: '厄瓜多尔胜',
                                    'usedBuffCard|0-1': 1,
                                    'usedErrorFreeCard|0-1': 0,
                                },
                            },
                        ],
                    },
                },
            };
        },
    },
    //用户钱包
    {
        url: '/ee/guess/account',
        method: 'get',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    'buffCard|0-3': 0, //BUFF卡
                    diamond: 0, //钻石球
                    integral: 0, //积分
                    'pardon|0-2': 2,
                },
            };
        },
    },
    //参与竞猜弹窗重新确认数据
    {
        url: '/ee/guess/prepare',
        method: 'post',
        response: () => {
            return {
                status: 200,
                data: {
                    bonusTimes: 122,
                    'buffCardAvailable|0-1': 0,
                    diamond: 0,
                    'errorFreeCardAvailable|0-1': 0,
                    integral: 0,
                },
            };
        },
    },
    //确认参与
    {
        url: '/ee/guess/participate',
        method: 'post',
        response: () => {
            return {
                status: 200,
                data: {
                    bonusTimes: 0,
                    code: 0, //状态：0 成功，1 奖励倍数已变化，2 可用积分不足，3 可用钻石球不足，4 可用免错卡不足，5 可用buff卡不足
                },
            };
        },
    },

    //活动礼物
    {
        url: '/ee/guess/gifts',
        method: 'post',
        response: () => {
            return {
                status: 200,
                'data|2-3': [
                    {
                        giftId: 0,
                        name: '111',
                        picUrl: 'http://120.77.176.134:9002/noble1.png',
                    },
                ],
            };
        },
    },

    //主播挑战 详情
    {
        url: '/ee/upgrade/challenge',
        method: 'post',
        response: () => {
            return {
                traceId: 'jvl9vvhg19udib',
                timestamp: 1668594063350,
                status: 200,
                data: {
                    team: [
                        {
                            id: 149,
                            teamA: {
                                id: 'TEAM_3',
                                name: '丹麦',
                                icon: 'https://showmetest-oss.elelive.cn/gift/gift/20221028/3550f297a60049bf99db6370b1884737.png',
                            },
                            teamB: {
                                id: 'TEAM_19',
                                name: '乌拉圭',
                                icon: 'https://showmetest-oss.elelive.cn/gift/gift/20221028/3550f297a60049bf99db6370b1884737.png',
                            },
                            time: null,
                        },
                    ],
                    supportTeamId: null,
                    status: 1,
                    activityStartTime: 1668571200000,
                    activityEndTime: 1669194580000,
                    roundStartTime: 1668593580000,
                    roundEndTime: 1668593760000,
                    nextRoundStartTime: null,
                    userId: 'Test00000864',
                    nickName: 'XM_成就17',
                    avatarPicUrl: 'https://showmetest-oss.elelive.cn/avatar/Test00000864?1=1&t=1644830042579',
                    curlLevel: null,
                    levelList: [
                        {
                            level: 1,
                            status: 2,
                            perIntegral: 22,
                            needIntegral: 22,
                            configTotalValue: 22,
                            prizes: [
                                {
                                    giftId: 315,
                                    giftName: '小象表情',
                                    quantity: 1,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20210526/daa4167d5ad943c685f6612fbb71809d.png',
                                    coinType: 0,
                                    prize: 3000,
                                    isSpcePrize: 0,
                                },
                                {
                                    giftId: 387,
                                    giftName: '幸运纸鹤',
                                    quantity: 10,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/2d417420132942afb047a730eefa9a35.png',
                                    coinType: 0,
                                    prize: 5200,
                                    isSpcePrize: 1,
                                },
                            ],
                        },
                        {
                            level: 2,
                            status: 0,
                            perIntegral: 66,
                            needIntegral: 44,
                            configTotalValue: 66,
                            prizes: [
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 2,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 10400,
                                    isSpcePrize: 0,
                                },
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 20,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 104000,
                                    isSpcePrize: 1,
                                },
                            ],
                        },
                        {
                            level: 3,
                            status: 0,
                            perIntegral: 88,
                            needIntegral: 22,
                            configTotalValue: 88,
                            prizes: [
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 3,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 15600,
                                    isSpcePrize: 0,
                                },
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 30,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 156000,
                                    isSpcePrize: 1,
                                },
                            ],
                        },
                        {
                            level: 4,
                            status: 0,
                            perIntegral: 333,
                            needIntegral: 245,
                            configTotalValue: 333,
                            prizes: [
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 4,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 20800,
                                    isSpcePrize: 0,
                                },
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 40,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 208000,
                                    isSpcePrize: 1,
                                },
                            ],
                        },
                        {
                            level: 5,
                            status: 0,
                            perIntegral: 888,
                            needIntegral: 555,
                            configTotalValue: 888,
                            prizes: [
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 5,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 26000,
                                    isSpcePrize: 0,
                                },
                                {
                                    giftId: 385,
                                    giftName: '幸运时空',
                                    quantity: 50,
                                    picUrl: 'https://showmetest-oss.elelive.cn/gift/gift/20211224/64e6e3cc417349efa9216a3dc1c79c78.png',
                                    coinType: 0,
                                    prize: 260000,
                                    isSpcePrize: 1,
                                },
                            ],
                        },
                    ],
                },
                msg: '',
            };
            return {
                status: 200,
                timestamp: Date.now(),
                data: {
                    avatarPicUrl: 'http://120.77.176.134:9002/noble1.png',
                    curlLevel: 0,
                    levelList: [
                        {
                            level: 1,
                            needIntegral: 0,
                            num: 0,
                            perIntegral: 0,
                            'prizes|2-6': [
                                {
                                    coinType: 0,
                                    giftId: /\d{5,10}/,
                                    giftName: '奖品',
                                    'isSpcePrize|0-1': 0,
                                    picUrl: 'http://120.77.176.134:9002/noble1.png',
                                    prize: 0,
                                    'quantity|1-3': 0,
                                },
                            ],
                            status: 1, //0 未解锁 1 已解锁 2 进行中
                        },
                        {
                            level: 2,
                            needIntegral: 0,
                            num: 0,
                            perIntegral: 0,
                            'prizes|2-6': [
                                {
                                    coinType: 0,
                                    giftId: /\d{5,10}/,
                                    giftName: '奖品',
                                    'isSpcePrize|0-1': 0,
                                    picUrl: 'http://120.77.176.134:9002/noble1.png',
                                    prize: 0,
                                    'quantity|1-3': 0,
                                },
                            ],
                            status: 2,
                        },
                        {
                            level: 3,
                            needIntegral: 0,
                            num: 0,
                            perIntegral: 0,
                            'prizes|2-6': [
                                {
                                    coinType: 0,
                                    giftId: /\d{5,10}/,
                                    giftName: '奖品',
                                    'isSpcePrize|0-1': 0,
                                    picUrl: 'http://120.77.176.134:9002/noble1.png',
                                    prize: 0,
                                    'quantity|1-3': 0,
                                },
                            ],
                            status: 0,
                        },
                        {
                            level: 4,
                            needIntegral: 0,
                            num: 0,
                            perIntegral: 0,
                            'prizes|2-6': [
                                {
                                    coinType: 0,
                                    giftId: /\d{5,10}/,
                                    giftName: '奖品',
                                    'isSpcePrize|0-1': 0,
                                    picUrl: 'http://120.77.176.134:9002/noble1.png',
                                    prize: 0,
                                    'quantity|1-3': 0,
                                },
                            ],
                            status: 0,
                        },
                        {
                            level: 5,
                            needIntegral: 0,
                            num: 0,
                            perIntegral: 0,
                            'prizes|2-6': [
                                {
                                    coinType: 0,
                                    giftId: /\d{5,10}/,
                                    giftName: '奖品',
                                    'isSpcePrize|0-1': 0,
                                    picUrl: 'http://120.77.176.134:9002/noble1.png',
                                    prize: 0,
                                    'quantity|1-3': 0,
                                },
                            ],
                            status: 0,
                        },
                    ],
                    nickName: 'zkkk',
                    roundEndTime: Date.now() + 100000,
                    roundStartTime: 0,
                    nextRoundStartTime: Date.now() + 1000000,
                    status: 0, // 0：未开始 1：一开始未选球队 2：一开始已选球队 10：结束
                    userId: '22333',
                    'team|1-4': [
                        {
                            teamA: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                                'selectState|0-1': 0,
                            },
                            teamB: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                                'selectState|0-1': 0,
                            },
                        },
                    ],
                },
            };
        },
    },
    //主播挑战 奖励记录
    {
        url: '/ee/upgrade/supportList',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                'data|1-4': [
                    {
                        'prizes|1-10': [
                            {
                                coinType: 0,
                                'giftId|+1': 0,
                                giftName: Random.csentence(3),
                                isSpcePrize: 0,
                                picUrl: 'http://120.77.176.134:9002/noble1.png',
                                prize: 0,
                                quantity: 0,
                            },
                        ],
                        'supportState|0-1': 0,
                        team: {
                            time: Date.now() - 200000, //场次时间
                            teamA: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: '122',
                                name: '@string("lower", 5)',
                                'selectState|0-1': 0,
                                score: 1,
                            },
                            teamB: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: '333',
                                name: '@string("lower", 5)',
                                'selectState|0-1': 0,
                                score: 2,
                            },
                        },
                    },
                ],
            };
        },
    },

    //竞猜冠军球队
    {
        url: '/ee/guess/guessTeamPage',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    awardIntegral: 0,
                    bonusTimes: 0,
                    currTime: Date.now() + 1000000000,
                    guessEndTime: Date.now() + 200000, //竞猜结束时间
                    guessStartTime: Date.now() - 200000, //竞猜开始时间
                    'guessRecords|3': [
                        {
                            participatedIntegral: 1110,
                            team: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: '',
                                name: '@string("lower", 5)',
                            },
                            'usedBuffCard|0-1': 0,
                            'usedErrorFreeCard|0-1': 0,
                        },
                    ],
                    guessSuccess: 1,
                    hasResult: 0,
                    publicResultTime: 0,
                    winTeam: {
                        icon: 'http://120.77.176.134:9002/noble1.png',
                        id: '',
                        name: '@string("lower", 5)',
                    },
                },
            };
        },
    },

    //猜最佳球员页面
    {
        url: '/ee/guess/guessPlayerPage',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    bestPlayer: {
                        icon: 'http://120.77.176.134:9002/noble1.png',
                        id: /\d{5,10}/,
                        name: '@string("lower", 5)',
                        teamId: '',
                    },
                    // bestPlayer: null,
                    //我选择的球员
                    selectedPlayer: {
                        icon: 'http://120.77.176.134:9002/noble1.png',
                        id: /\d{5,10}/,
                        name: '@string("lower", 5)',
                        teamId: '',
                    },
                    // selectedPlayer: null,
                    currTime: Date.now() + 1,
                    guessEndTime: Date.now() + 200000, //竞猜结束时间
                    guessStartTime: Date.now() - 200000, //竞猜开始时间
                    'obtainRebateUsers|3-10': [
                        {
                            avatar: 'http://120.77.176.134:9002/noble1.png',
                            id: /\d{5,10}/,
                            nickname: '@string("lower", 5)',
                        },
                    ],
                    'guessSuccess|0-1': 0,
                    'hasResult|1': 0,
                    publicResultTime: 0,
                    bonusTimes: 0.1,
                },
            };
        },
    },
    //球队列表
    {
        url: '/ee/guess/teamList',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                'data|1-10': [
                    {
                        icon: 'http://120.77.176.134:9002/noble1.png',
                        id: /\d{5,10}/,
                        name: '@string("lower", 5)',
                    },
                ],
            };
        },
    },
    //球员列表
    {
        url: '/ee/guess/playerList',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                'data|1-10': [
                    {
                        icon: 'http://120.77.176.134:9002/noble1.png',
                        id: /\d{5,10}/,
                        name: '@string("lower", 5)',
                        teamId: /\d{5,10}/,
                    },
                ],
            };
        },
    },

    //用户已参与的竞猜记录
    {
        url: '/ee/guess/participatedRecord',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    pageNo: 0,
                    pageSize: 0,
                    'records|0-1': [
                        {
                            'bonusTimes|2-10': 0,
                            concedeBallNum: 0,
                            concedeBallTeam: '',
                            delimitValue: 0,
                            'guessType|1-6': 0, //竞猜类型
                            largeBall: 0,
                            optionId: '',
                            participateNum: 0,
                            'participateType|1-2': 0,
                            player: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                                teamId: '',
                            },
                            scoreStr: '',
                            singleNumber: 0,
                            teamA: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                            },
                            teamB: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                            },
                            time: Date.now(),
                            winTeam: '',
                        },
                    ],
                    totalNum: 0,
                    totalPage: 0,
                },
            };
        },
    },

    //竞猜成功记录
    {
        url: '/ee/guess/successfulRecord',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    pageNo: 0,
                    pageSize: 0,
                    'records|10': [
                        {
                            'details|2-4': [
                                {
                                    awardEleCoin: 0,
                                    awardIntegral: 0,
                                    concedeBallNum: 2,
                                    concedeBallTeam: '222',
                                    delimitValue: 0,
                                    'guessType|1-4': 0,
                                    largeBall: 0,
                                    optionId: '',
                                    participatedDiamond: 0,
                                    participatedIntegral: 0,
                                    scoreStr: '0:1',
                                    singleNumber: 0,
                                    usedBuffCard: 1,
                                    usedErrorFreeCard: 1,
                                    winTeam: '',
                                },
                            ],
                            startTime: Date.now(),
                            teamA: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                            },
                            teamB: {
                                icon: 'http://120.77.176.134:9002/noble1.png',
                                id: /\d{5,10}/,
                                name: '@string("lower", 5)',
                            },
                            teamAScore: 0,
                            teamBScore: 0,
                        },
                    ],
                    totalNum: 0,
                    totalPage: 0,
                },
            };
        },
    },

    //增加免错卡
    {
        url: '/ee/guess/addPardon',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                status: 200,
                data: {
                    success: 1,
                },
            };
        },
    },
];

export default mocks;
