// 甜蜜日榜
import React, { useEffect, useState, memo } from 'react';
import intl from 'react-intl-universal';
import Skeleton from '@material-ui/lab/Skeleton';
import Img from 'elelive-ui/es/Components/Img'; 
import 'elelive-ui/es/Components/Img/index.css';
import CountDown from 'elelive-ui/es/Components/CountDown';
import classNames from 'classnames';
import api from "@Lib/api";
import {Text} from '@Components/index';
import appStore from "@Stores/appStore";
import { RankHead, AnchorHead } from '@Components/BaseComponents';
import Rank from './rank';
import './index.scss';

const User = () => {
    const [info, setInfo]: any = useState({});
    const [rankList, setRankList]: any = useState([]);
    const { anchorId } = appStore.params;
    const { accessToken } = appStore.auth;
    const [topData, setTopData]: any = useState({});
    const [loading, setLoading] = useState(false);
    // 当前用户信息
    const [currentRank, setCurrentRank] = useState<any>({});
    useEffect(() => {
        init();
    }, []);
    // 更新info接口
    const init = () => {
        setLoading(true);
        const start = Date.now();
        api.richRankList({
            anchorId,
        }).then((res) => {
            if (res.status === 200) {
                const { rankData, lastTop } = res?.data;
                const temp = new Array(10).fill({}).map((item, i) => {
                    let rankItem = item;
                    if (rankData.list[i]) {
                        rankItem = rankData.list[i];
                    } else {
                        rankItem = {
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
                    }
                    return rankItem;
                });
                setRankList(temp);
                setTopData(lastTop);
                setCurrentRank(rankData.currentRank);
                setInfo(res?.data);
            }

            closeLoading(start);
        });
    };
    // 关闭loading
    const closeLoading = (start) => {
        const delay = 500;
        if (start + delay < Date.now()) {
            setLoading(false);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, delay);
        }
    };
    // 活动头部
    const rankRendering = () => {
        switch (info.state) {
            case 0: {
                return (
                    <div className="sweetRank-rank-head">
                        <div>
                            <Text i18nKey="activityHasStarted">活动未开始</Text>
                        </div>
                    </div>
                );
            }
            case 1: {
                return (
                    <div className="sweetRank-rank-head">
                        <div>
                            <Text i18nKey="fromEndRound">距本轮结束</Text>{' '}
                            <small>
                                {info?.roundEndTime ? (
                                    <CountDown
                                        ROOT_BASE={ROOT_BASE}
                                        endTime={info.roundEndTime}
                                        onHandCountDownEvent={init}
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
                                init();
                            }}
                        />
                    </div>
                );
            }
            case 10: {
                return (
                    <div className="sweetRank-rank-head">
                        <div>
                            <Text i18nKey="activityHasEnded">活动已结束</Text>
                        </div>
                    </div>
                );
            }
            default: {
                return <div className="sweetRank-rank-head" />;
            }
        }
    };

    // 自己
    const myRankRendering = () => {
        if (accessToken && currentRank?.userInfo?.userId && info.state !== 5) {
            const my = {
                img: currentRank.userInfo.image,
                name: currentRank.userInfo.name,
                value: currentRank.userInfo.value,
                uid: currentRank.userInfo.userId,
                click: !!currentRank.userInfo.userId,
                noValue: true, // 不显示值
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
                                    {currentRank.rank <= 3 ? (
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
                                <div className="footer-suer">
                                    <p>{currentRank?.userInfo?.value}</p>
                                    <Text
                                        i18nKey="theFirst"
                                        options={{ value: currentRank?.userInfo?.distant }}
                                    >
                                        {' '}
                                        距第一名相差1
                                    </Text>
                                </div>
                            </li>
                        </ul>
                    </div>
                </>
            );
        }
        return <></>;
    };

    return (
        <div className="sweetRank-user">
            <div className="sweetRank-titleBox">
                <div className="sweetRank-main">
                    {/* 日期 */}
                    <div className="sweetRank-anchor">
                        <div className="sweetRank-anchor-title">
                            <Text i18nKey="strongestYesterday">昨日最强守护</Text>
                        </div>
                        <div className="sweetRank-anchor-ul">
                            <>
                                {info.state === 5 ? (
                                    <AnchorHead
                                        itemData={{
                                            uid: '',
                                            name: intl.get('leaveSeatVacant') || '虚位以待',
                                            img: '',
                                        }}
                                    />
                                ) : (
                                    <AnchorHead
                                        itemData={{
                                            uid: topData.userId,
                                            name:
                                                topData.name ||
                                                intl.get('leaveSeatVacant') ||
                                                '虚位以待',
                                            img: topData.image,
                                            click: !!topData.userId,
                                        }}
                                    />
                                )}
                            </>
                        </div>
                    </div>
                    {loading ? (
                        <Skeleton
                            variant="text"
                            width="10%"
                            style={{ marginLeft: '30px', marginBottom: '20px' }}
                        />
                    ) : (
                        rankRendering()
                    )}
                    <Rank rankLoading={loading} list={rankList} info={info} />
                </div>
            </div>
            {/* 自己的排行 */}
            {myRankRendering()}
        </div>
    );
};

export default memo(User);
