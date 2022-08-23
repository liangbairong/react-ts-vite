import React, { FC, memo, useEffect, useState } from 'react';

import Img from 'elelive-ui/es/Components/Img';
import Empty from 'elelive-ui/es/Components/Empty';
import { observer } from 'mobx-react-lite';

import classNames from 'classnames';

import intl from 'react-intl-universal';

import appStore from '@Stores/appStore';

import api from '@Lib/api';

import { LuckyStageContext } from '@Context/index';

import luckyStore from '@Stores/luckyStore';

import JSBridge from '@Utils/JSBridge';

import { CoinValueMap, Text } from '@Components/index';

import './index.scss';

const noStartEmptyImage = new URL('@Assets/images/common/placeholder_nostart.png',import.meta.url).href;

interface LuckyRecordAvatarProps {
    image?: string; // 主播头像
    liveState?: 0 | 1; // 是否直播中
    nickName?: string; // 主播昵称
    anchorId?: string; // 主播ID
}

interface LuckyRecordItemProps {
    id?: number;
    date?: string; // 幸运儿记录时间
    list?: LuckyRecordAvatarProps[];
}

interface LuckyRecordProps {
    list?: LuckyRecordItemProps[];
    regionType?: string;
}

interface LuckyDetailProps {
    image?: string;
    awardsNum?: number;
    awardsName?: string;
    awardsValue?: number;
    awardsType?: number;
}

const LuckyRecord: FC = observer((): JSX.Element => {
    const { anchorId } = appStore.params;
    const [record, setRecord] = useState<LuckyRecordProps>();
    const { list = [], regionType } = record || {};
    const regionOption = {
        XM: 'MalaysiaRegion',
        SG: 'SingaporeRegion',
        TW: 'TaiwanChina',
        VN: 'VietnamRegion',
        ID: 'IndonesiaRegion',
    };
    const emptyProps = {
        image: noStartEmptyImage,
        description: <Text i18nKey="NoLotteryRecordYet">暂无抽取记录</Text>,
    };

    const handListItemClick = (options) => {
        // 这里的uid必须是用户自己的uid，所以需要从auth拿
        const { uid } = appStore.auth;
        /* 先判断是否主播，再判断是否在主播的直播间 */
        if (anchorId === uid || anchorId === options.anchorId) {
            return;
        }

        if (options.liveState === 1) {
            JSBridge.toAppLive(options.anchorId, options.image);
        } else {
            JSBridge.toAppPersonal(options.anchorId);
        }
    };

    const dateFilter = (str) => {
        const a = (str && str.split('.')) || [];
        return `${a[0]}.${a[1]}`;
    };
    useEffect(() => {
        api.getLuckyRecord({ anchorId }).then((res) => {
            if (res.status === 200) {
                setRecord(res.data);
            }
        });
    }, []);

    return (
        <>
            <div className="luckyRecord">
                <div className={classNames('commonTitle', 'luckyRecordTitle')}>
                    <span data-text={intl.get('Totheendofthisround')}>
                        <Text i18nKey="Totheendofthisround">心动幸运儿记录</Text>
                    </span>
                </div>
                {Array.isArray(list) && list.length > 0 ? (
                    list.map((item, index) => {
                        return (
                            <div className="luckyRecordItem" key={index}>
                                <div className="luckyRecordDate">{dateFilter(item.date)}</div>
                                <div className="luckyRecordBox">
                                    {Array.isArray(item.list) &&
                                        item.list.slice(0, 3).map((ctxItem, ctxIndex) => {
                                            return (
                                                <div
                                                    key={ctxIndex}
                                                    className="luckyRecordAnchor"
                                                    onClick={() => handListItemClick(ctxItem)}
                                                >
                                                    <div className="luckyRecordAvatar">
                                                        <Img src={ctxItem.image} />
                                                        {ctxItem.liveState === 1 && (
                                                            <span className="luckyRecordState">
                                                                <Text i18nKey="Living">直播中</Text>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="luckyRecordName">
                                                        {ctxItem.nickName}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="luckyRecordItem">
                        <Empty {...emptyProps} />
                    </div>
                )}
            </div>
            <div className="luckyRecordFooter">
                <Text i18nKey={regionOption[regionType || 'XM']}>马来西亚区域</Text>
            </div>
        </>
    );
});

const LuckyDetail: FC = observer((): JSX.Element => {
    const { anchorId } = appStore.params;
    const [luckyData, setLuckyData] = useState<LuckyDetailProps>({});

    useEffect(() => {
        api.getLuckyDetail({ anchorId }).then((res) => {
            if (res.status === 200) {
                setLuckyData(res.data);
            }
        });
    }, []);

    if (!luckyData?.awardsValue) {
        return <></>;
    }

    return (
        <div className="luckyDetail">
            <div className="luckyDetailBox">
                <div className="luckyDetailInfo">
                    <Text i18nKey="EveryDay24" options={{ value: 24 }}>
                        每日24点，系统将在当天心动日榜前20名中随机抽取3名主播成为心动幸运儿，赠送以下礼物
                    </Text>
                </div>
                <div className="luckyDetailAvatar">
                    <Img src={luckyData.image} alt="" />
                    <span>x{luckyData.awardsNum}</span>
                </div>
                <div className="luckyDetailName">{luckyData.awardsName}</div>
                <div className="luckyDetailValue">
                    <Text i18nKey="TotalValue">总价值</Text>
                    <span className="intl-active"> {luckyData.awardsValue} </span>
                    <CoinValueMap value={luckyData.awardsType} />
                </div>
            </div>
        </div>
    );
});

const Lucky: FC = (): JSX.Element => {
    return (
        <div className="lucky">
            <div className="luckyWraper">
                <div className="topBar" />
                <LuckyDetail />
            </div>
            <div className="luckyWraper">
                <div className="topBar" />
                <LuckyRecord />
            </div>
        </div>
    );
};

// 外层组件，动态加载context
const Index: FC = (): JSX.Element => (
    <LuckyStageContext.Provider value={luckyStore}>
        <Lucky />
    </LuckyStageContext.Provider>
);

export default memo(Index);
