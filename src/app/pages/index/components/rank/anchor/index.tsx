// 甜蜜日榜
import React, {useEffect, useState, memo} from 'react';
import Img from 'elelive-ui/es/Components/Img';
import CountDown from 'elelive-ui/es/Components/CountDown';
import classNames from 'classnames';
import api from "@Lib/api";
import {
    Text,
} from '@Components/index';
import appStore from "@Stores/appStore";
import {RankHead, AnchorHead} from '@Components/BaseComponents';
import Rank from './rank';
import './index.scss';
import intl from "react-intl-universal";
import IndexSkeleton from "../skeleton";


// 活动头部
const RankRendering = ({data}) => {
    if (data.state === 0) {
        return (
            <div className="sweetRank-rank-head">
                <div>
                    <Text i18nKey="activityHasStarted">活动未开始</Text>
                </div>
            </div>
        );
    }else if(data.state === 1){
        return (
            <div className="sweetRank-rank-head">
                <div>
                    <Text i18nKey="fromEndRound">距本轮结束</Text>{' '}
                    <small>
                        {data.endDate ? (
                            <CountDown
                                ROOT_BASE={ROOT_BASE}
                                endTime={data.endDate}
                                onHandCountDownEvent={() => {
                                    console.log('刷新');
                                    // window.location.reload()
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </small>
                </div>
                <Img
                    src={new URL('@Assets/images/sweetRank/refresh.png',import.meta.url).href}
                    className={classNames('sweetRank-refresh-btn')}
                    onClick={() => {
                        // window.location.reload()
                        // init();
                    }}
                />
            </div>
        );
    }else if(data.state === 5){
        return (
            <div className="sweetRank-rank-head">
                <div>
                    <Text i18nKey="ThinEnded">本轮已结束</Text>
                </div>
            </div>
        );
    }else if (data.state === 10) {
        return (
            <div className="sweetRank-rank-head">
                <div>
                    <Text i18nKey="activityHasEnded">活动已结束</Text>
                </div>
            </div>
        );
    }
    return <></>
};


// 主播自己
const MyRankRendering = ({data}) => {
    const { anchorId } = appStore.params;
    // 仅用户在主播的直播间访问该页面时，且当前直播间的主播存在浏览的榜单上时
    if (data?.currentRank?.anchorInfo?.userId && anchorId && data.state !== 5) {
        const {currentRank}=data
        const my = {
            img: currentRank.anchorInfo.image,
            name: currentRank.anchorInfo.name,
            value: currentRank.anchorInfo.value,
            uid: currentRank.anchorInfo.userId,
            living: currentRank.anchorInfo.liveState,
            click: !!currentRank.anchorInfo.userId,
        };
        const help = {
            img: currentRank.userInfo.image,
            name: currentRank.userInfo.name,
            value: currentRank.userInfo.value,
            uid: currentRank.userInfo.userId,
            click: !!currentRank.userInfo.userId,
        };

        const img = {
            1: new URL('@Assets/images/sweetRank/one.png',import.meta.url).href,
            2: new URL('@Assets/images/sweetRank/two.png',import.meta.url).href,
            3: new URL('@Assets/images/sweetRank/free.png',import.meta.url).href,
        };
        return (
            <>
                {/* <div className="myRank-fixed-bottom-height" /> */}
                <div className="fixed-bottom">
                    <ul className="rank-li my-rank">
                        <li>
                            <div className="rank-index">
                                {currentRank.anchorInfo.userRank <= 3 ? (
                                    <Img
                                        src={img[currentRank.rank]}
                                        className="rank-index-img"
                                    />
                                ) : (
                                    ''
                                )}
                                <span>{currentRank.rank > 99 ? '99+' : currentRank.rank}</span>
                            </div>
                        </li>
                        <li>
                            <RankHead itemData={my} />
                        </li>
                        <li>
                            <RankHead itemData={help} />
                        </li>
                    </ul>
                </div>
            </>
        );
    }
    return <></>;
};

const Anchor = () => {

    const { anchorId } = appStore.params;
    const [rankList, setRankList]: any = useState([]);
    // 区域
    const [region, setRegion] = useState<any>('');

    const listItem = {
        anchorInfo: {
            image: '',
            liveState: 0,
            name: '',
            userId: '',
            value: 0,
        },
        rank: 0,
        userInfo: {
            image: '',
            name: '',
            userId: '',
            value: 0,
        },
    };


    const {data, isLoading} = api.loveRankList({
        roundId:' data.roundId',
        anchorId,
    })

    useEffect(()=>{
        if(data){
            const { rankData, regionType } = data;
            const temp = new Array(30).fill({}).map((_item, i) => {
                let rankItem = {};
                if (rankData.list[i]) {
                    rankItem = rankData.list[i];
                } else {
                    rankItem = listItem;
                }
                return rankItem;
            });
            setRankList(temp);
            setRegion(regionType);
        }
    },[data])


    if (isLoading) return <IndexSkeleton/>

    return (
        <div className="sweetRank">
            {!anchorId && (
                <div className="ment">
                    <Text i18nKey="dailyRanking">爱意日榜</Text>
                </div>
            )}
            <div className="sweetRank-titleBox">
                <div className="sweetRank-main">
                    <div className="sweetRank-anchor">
                        <div className="sweetRank-anchor-title">
                            <Text i18nKey="No.1主播和Ta的最强守护">No.1主播和Ta的最强守护</Text>
                        </div>
                        <div className="sweetRank-anchor-ul">
                            <>
                                {data.state === 5 ? (
                                    <AnchorHead
                                        itemData={{
                                            uid: '',
                                            name: intl.get('leaveSeatVacant') || '虚位以待',
                                            img: '',
                                        }}
                                    />
                                ) : (
                                   <div>
                                       <div>
                                           <AnchorHead
                                               itemData={{
                                                   uid: data?.currentRank?.userInfo?.userId,
                                                   name:
                                                       data?.currentRank?.userInfo?.name ||
                                                       intl.get('leaveSeatVacant') ||
                                                       '虚位以待',
                                                   img: data?.currentRank?.userInfo?.image,
                                                   click: !!data?.currentRank?.userInfo?.userId,
                                               }}
                                           />
                                       </div>
                                       <div>
                                           <AnchorHead
                                               itemData={{
                                                   uid: data?.currentRank?.userInfo?.userId,
                                                   name:
                                                       data?.currentRank?.userInfo?.name ||
                                                       intl.get('leaveSeatVacant') ||
                                                       '虚位以待',
                                                   img: data?.currentRank?.userInfo?.image,
                                                   click: !!data?.currentRank?.userInfo?.userId,
                                               }}
                                           />
                                       </div>
                                   </div>
                                )}
                            </>
                        </div>
                    </div>
                    <RankRendering data={data}/>

                    <Rank list={rankList} info={data} regionType={region} />
                </div>
            </div>

            <MyRankRendering data={data}/>
        </div>
    );
};

export default memo(Anchor);
