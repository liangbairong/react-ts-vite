export default [
  //  用户数据
  {
    url: '/ee/loveRank/index',
    method: 'get',
    response: ({}) => {
      return {
        status: 200,
        data: {
            anchorId: '',
            rankData: {
                currentRank: {
                    anchorInfo: {
                        image: 'https://www.sioe.cn/z/uploadfile/201010/5/B2214636319.jpg',
                        liveState: 1,
                        name: 'dds',
                        userId: '1',
                        value: 0,
                    },
                    rank: 10,
                    userInfo: {
                        image: 'https://www.sioe.cn/z/uploadfile/201010/5/B2214636319.jpg',
                        name: 'dd',
                        userId: '',
                        value: 0,
                    },
                },
                list: [
                    {
                        anchorInfo: {
                            image: 'https://www.sioe.cn/z/uploadfile/201010/5/B2214636319.jpg',
                            liveState: 1,
                            name: 'dds',
                            userId: '11',
                            value: 0,
                        },
                        rank: 1,
                        userInfo: {
                            image: 'https://www.sioe.cn/z/uploadfile/201010/5/B2214636319.jpg',
                            name: 'dd',
                            userId: '',
                            value: 0,
                        },
                    },
                ],
            },
            regionType: 2,
            roundId: 0,
            state:1,
            endDate:Date.now()+20000
        },
    }
    },
  },



];
