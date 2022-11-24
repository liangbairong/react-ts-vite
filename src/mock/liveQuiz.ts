const mocks = [
    // 首页用户信息
    {
        url: '/ee/answer/index',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: {
                    account: {
                        amount: '@integer(5000,300000)',
                        'cardNum|1-10': 2,
                        ownCode: '@title(1)',
                        userId: '@id()',
                        userImg: '@image(100,#ccc)',
                        userName: '@cname',
                    },
                    round: {
                        amount: '@integer(5000000,30000000)',
                        anchorId: '@id()',
                        anchorImg: '@image(100,#fff)',
                        anchorName: '@cname',
                        roundId: '@id()',
                        startTime: Date.now() + 1000 * 60 * 60 * 5,
                        'state|1': [1],
                        orderStatus: true,
                    },
                },
                msg: '',
                status: 200,
                timestamp: Date.now(),
                traceId: '',
            };
        },
    },
    //预约
    {
        url: '/ee/answer/order',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: 200,
                msg: '预约失败',
                status: 200,
                timestamp: Date.now(),
                traceId: '',
            };
        },
    },
    //账户信息查询
    {
        url: '/ee/withdrawal/account',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: {
                    'bankFinish|1': [1],
                    'endAmount|1-500000': 800,
                    'processAmount|1-500000': 999,
                    'remainAmount|1-500000': 900,
                },
                msg: '预约失败',
                status: 200,
                timestamp: Date.now(),
                traceId: '',
            };
        },
    },
    //提现
    {
        url: '/ee/withdrawal/draw',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: {
                    endAmount: 111,
                    processAmount: 111,
                    remainAmount: 2110,
                    status: 1, //1:成功 2:账户不存在 3:银行信息未完善 4:金额不足 6活动结束
                },
                msg: '',
                status: 0,
                timestamp: 0,
                traceId: '',
            };
        },
    },
    //保存银行信息
    {
        url: '/ee/withdrawal/bankAccount/saveOrUpdate',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: true,
                msg: '',
                status: 0,
                timestamp: 0,
                traceId: '',
            };
        },
    },
    //查询银行信息
    {
        url: '/ee/withdrawal/bankAccount',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: {
                    bankName: 'dafasdfasfdsfsadfdffgasdfdsfdas',
                    bankNo: '12312123123',
                    id: '@id()',
                    mobile: '136495534684',
                    mobileCode: '86',
                    realName: 'dsafsdfdsfsdfasddfhdgdsgasdfgsdfasd',
                },
                msg: '',
                status: 200,
                timestamp: 0,
                traceId: '',
            };
        },
    },
    //明细
    {
        url: '/ee/withdrawal/moneyRecords',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                data: {
                    // records: [],
                    records: [
                        {
                            amount: 10010,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 3, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 100,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 1, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 10086,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 2, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 100,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 1, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 10086,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 2, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 10010,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 3, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 100,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 1, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 10086,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 2, //1:活动获得 2: 提现 3:提现被拒
                        },
                        {
                            amount: 10010,
                            eventTime: Date.now() + 1000000 * Math.random(),
                            remark: '@title()', //提现被拒原因
                            type: 3, //1:活动获得 2: 提现 3:提现被拒
                        },
                    ],
                },
                msg: '',
                status: 200,
                timestamp: 0,
                traceId: '',
            };
        },
    },
];

export default mocks;
