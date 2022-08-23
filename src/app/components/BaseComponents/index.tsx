import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Img from 'elelive-ui/es/Components/Img';
import moment from 'moment';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Text,
} from '@Components/index';
import Empty from 'elelive-ui/es/Components/Empty';
import JSBridge from '../../utils/JSBridge';
import appStore from '../../stores/appStore';
import './index.scss';
// 基本组件


/**
 *
 * 空盒子
 * @constructor
 */
type IBoxRecordEmpty = {
    title?: React.ReactNode | string;
    image?: string | any;
    height?: number;
};

export const BoxRecordEmpty: FC<IBoxRecordEmpty> = observer(
    ({
        title = <Text i18nKey="activityNotStarted">活动未开始</Text>,
        image = new URL('@Assets/images/no-data.png',import.meta.url).href,
        height = 174,
    }: IBoxRecordEmpty): JSX.Element => (
        <div className="BoxRecordEmpty">
            <Empty
                image={image}
                imageStyle={{
                    height,
                }}
            >
                {title}
            </Empty>
        </div>
    )
);


// 开启记录奖品
type IPrizeHead = {
    itemData?: any;
    isShowType?: boolean;
};




// 七夕日期组件
type ITanabataDate = {
    timeList?: Array<any>;
    // eslint-disable-next-line no-unused-vars
    updateFn?: (time?: number) => void;
};

export const TanabataDate: FC<ITanabataDate> = observer(
    ({ timeList = [], updateFn = () => {} }: ITanabataDate): JSX.Element => {
        const [dateIndex, setDateIndex] = useState(-1);
        const [dateList, setDateList]: Array<any> = useState([]);

        const {
            appSystemInfo: { language },
        } = appStore;
        useEffect(() => {
            if (timeList && timeList.length > 0) {
                const temp: Array<any> = [];
                const formatsMap = {
                    'zh-CN': 'MM.DD',
                    'zh-TW': 'MM/DD',
                    en: 'DD/MM',
                    id: 'DD-MM',
                    vi: 'DD.MM',
                };

                timeList.forEach((_item, index) => {
                    if (String(_item.state) !== '0') {
                        setDateIndex(index);
                    }
                    const a = {
                        ..._item,
                        time: _item.startDate,
                        label: moment(_item.startDate).format(formatsMap[language]),
                        value: moment(_item.startDate).format('MM-DD'),
                    };
                    temp.push(a);
                });
                setDateList(temp);
            }
        }, [timeList]);

        useEffect(() => {
            console.log(dateIndex);
            if (dateIndex >= 0 && dateList[dateIndex]) {
                updateFn(dateList[dateIndex]);
            }
        }, [dateIndex]);

        const changeDateFn = (item, index: number) => {
            if (String(item.state) !== '0') {
                setDateIndex(index);
            }
        };

        return (
            <div className="tanabataDate-skeleton">
                {timeList.length === 0 ? (
                    <Skeleton variant="rect" height={50} animation="wave" />
                ) : (
                    <div className="tanabataDate">
                        <div className="tanabataDate-ul">
                            {dateList.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        changeDateFn(item, index);
                                    }}
                                    className={classNames(
                                        'tanabataDate-li',
                                        index === dateIndex ? 'tanabataDate-li-action' : '',
                                        item.state === 0 ? 'tanabataDate-li-not' : ''
                                    )}
                                >
                                    <span> {item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

// 日榜头像
type IRankHead = {
    itemData?: any;
    className?: string;
};

export const RankHead: FC<IRankHead> = observer(
    ({ itemData, className = '' }: IRankHead): JSX.Element => {
        const linkFn = () => {
            if (itemData.click) {
                if (itemData.living === 1) {
                    JSBridge.toAppLive(itemData.uid, itemData.img);
                } else {
                    JSBridge.toAppPersonal(itemData.uid);
                }
            }
        };
        return (
            <div
                className={classNames('RankHead', className)}
                onClick={() => {
                    linkFn();
                }}
            >
                <div className="RankHead-img">
                    {itemData.img ? (
                        <Img src={itemData.img} className="RankHead-img-gm" xOssProcess="1x" />
                    ) : (
                        ''
                    )}
                    {itemData.living === 1 ? <div className="RankHead-type">LIVE</div> : ''}
                </div>
                <div className="RankHead-con">
                    <div className="RankHead-con-name">
                        {itemData.name || <Text i18nKey="leaveSeatVacant">虚位以待</Text>}
                    </div>
                    {!itemData.noValue && (
                        <div className="RankHead-con-value">{itemData.value || '-'}</div>
                    )}
                </div>
            </div>
        );
    }
);

// 主播头像
type IAnchorHead = {
    itemData?: any;
    children?: React.ReactNode;
    className?: string;
};

export const AnchorHead: FC<IAnchorHead> = observer(
    ({ itemData = {}, children, className = 'anchorHead-box' }: IAnchorHead): JSX.Element => {
        const linkFn = () => {
            if (itemData.click) {
                if (itemData.living === 1) {
                    JSBridge.toAppLive(itemData.uid, itemData.img);
                } else {
                    JSBridge.toAppPersonal(itemData.uid);
                }
            }
        };
        return (
            <div
                className={classNames(className)}
                onClick={() => {
                    linkFn();
                }}
            >
                <div className="anchorHead-img">
                    {itemData.img ? (
                        <Img src={itemData.img} className="anchorHead-img-has" xOssProcess="1x" />
                    ) : (
                        <Img
                            src={new URL('@Assets/images/xwyd.png',import.meta.url).href}
                            className="anchorHead-img-no"
                        />
                    )}
                    {itemData.living === 1 ? <div className="anchorHead-type">LIVE</div> : ''}
                </div>
                <div className="anchorHead-name">{itemData.name}</div>
                {children}
            </div>
        );
    }
);



