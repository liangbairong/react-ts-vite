import React, { FC } from 'react';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import CountDown from 'elelive-ui/es/Components/CountDown';
import {
    Text,
} from '@Components/index';
import { BoxRecordEmpty, RankHead } from '@Components/BaseComponents';

import './index.scss';


type IRank = {
    list?: object[];
    info: any;
    rankLoading: any;
};

const Rank: FC<IRank> = ({ list = [], info, rankLoading = false }: IRank): JSX.Element => {
    const rankIndexRendering = (_item, index) => {
        switch (index) {
            case 0: {
                return (
                    <div className="rank-index">
                        <Img
                            src={new URL('@Assets/images/sweetRank/one.png',import.meta.url).href}
                            className="rank-index-img"
                        />
                        <span>1</span>
                    </div>
                );
            }
            case 1: {
                return (
                    <div className="rank-index">
                        <Img
                            src={new URL('@Assets/images/sweetRank/two.png',import.meta.url).href}
                            className="rank-index-img"
                        />
                        <span>2</span>
                    </div>
                );
            }
            case 2: {
                return (
                    <div className="rank-index">
                        <Img
                            src={new URL('@Assets/images/sweetRank/free.png',import.meta.url)}
                            className="rank-index-img"
                        />
                        <span>3</span>
                    </div>
                );
            }
            default: {
                return (
                    <div className="rank-index">
                        <span>{index + 1}</span>
                    </div>
                );
            }
        }
    };

    const listRendering = () => {
        if (info.state === 0) {
            return (
                <div className="activityNotStarted-class">
                    <BoxRecordEmpty
                        title={<Text i18nKey="activityHasStarted">活动未开始</Text>}
                        image={new URL('@Assets/images/wks.png',import.meta.url).href}
                    />
                </div>
            );
        }
        if (info.state === 5) {
            return (
                <div className="activityNotStarted-class">
                    <BoxRecordEmpty
                        title={<Text i18nKey="rankingBeingSettled">榜单结算中</Text>}
                        image={new URL('@Assets/images/jsz.png',import.meta.url).href}
                        height={201}
                    />
                    <div className="settle-time">
                        {info.settleEndTime ? (
                            <>
                                <CountDown
                                    ROOT_BASE={ROOT_BASE}
                                    secondsParam={info.settleEndTime * 1000}
                                    timeFormat="ss"
                                    onHandCountDownEvent={() => {
                                        window.location.reload();
                                    }}
                                />
                                <span>s</span>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            );
        }
        return (
            <>
                {rankLoading ? (
                    <div className="rank-content">
                        {new Array(30).fill('').map((_item, index) => (
                            <div key={index}>
                                ddd
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rank-content">
                        {list.map((item: any, index) => {
                            const b = {
                                img: item.userInfo.image,
                                name: item.userInfo.name,
                                value: item.userInfo.value,
                                click: item.userInfo.userId, // 有uid才能点击
                                uid: item.userInfo.userId,
                                noValue: true, // 不显示值
                            };
                            return (
                                <ul
                                    className={classNames(
                                        'rank-li',
                                        index < 3 ? 'rank-li-action' : ''
                                    )}
                                    key={index}
                                >
                                    <li>{rankIndexRendering(item, index)}</li>
                                    <li>
                                        <RankHead itemData={b} />
                                    </li>
                                    <li>
                                        {item?.userInfo?.value && item?.userInfo?.value != 0
                                            ? item?.userInfo?.value
                                            : '-'}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                )}

                <div className="sweetRank-wb wb-user">
                    <p>
                        <Text i18nKey="onlyShowtop10">仅展示前10名</Text>
                    </p>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="rank">
                <ul className="rank-head">
                    <li>
                        <Text i18nKey="Ranking">名次</Text>
                    </li>
                    <li>
                        <Text i18nKey="user">用户</Text>
                    </li>
                    <li>
                        <Text i18nKey="guardValue">守护值</Text>
                    </li>
                </ul>
                {listRendering()}
            </div>
        </>
    );
};
export default Rank;
