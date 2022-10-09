export default [
    //  主播等级奖励
    {
        url: '/ee/growth/anchor/detail',
        method: 'post',
        timeout: 0,
        response: ({}) => {
            return {
                status: 200,
                "data": {
                    "allPeakPoints": 0,
                    "allPoints": 0,
                    "anchorLevel": 0,
                    "contracted": true,
                    "image": "http://120.77.176.134:9002/noble1.png",
                    "nickName": "试试",
                    "peakLevel": 0,
                    "totalPeakPoints": 0,
                    "totalPoints": 0,
                    nowLevelPoints:0,
                    levelType:1,
                },
            }
        },
    },
    //  主播等级奖励
    {
        url: '/ee/growth/config/getPrizeByLevelType',
        method: 'post',
        timeout: 0,
        response: ({}) => {
            return {
                status: 200,
                'data|3-10': [{
                    'level|+10': 10,
                    'children|6':[
                        {
                            awardName: '奖励名称',
                            'awardType|+1': 13,
                            awardNum: 10,
                            awardImage: 'http://120.77.176.134:9002/noble1.png',
                            validityPeriod: 100, //有效期
                        }
                    ]
                }],
            }
        },
    },


];


