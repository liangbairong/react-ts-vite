import React, { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Img from 'elelive-ui/es/Components/Img';
import Dialog from 'elelive-ui/es/Components/Dialog'
import Skeleton from 'elelive-ui/es/Components/Skeleton'
import classNames from 'classnames';
import {
    Text,
} from '@Components/index';
import './index.scss';

/**
 *
 * 盒子标题
 * @constructor
 */
type ITitleBox = {
    title?: React.ReactNode | string;
    children: React.ReactNode;
    className?: string;
};

export const TitleBox: FC<ITitleBox> = observer(
    ({ title, className, children }: ITitleBox): JSX.Element => (
        <div className={classNames('titleBox-main', className)}>
            <div className="titleBox-bg" />
            {title ? <h1 className="titleBox-title">{title}</h1> : ''}
            <div className="titleBox-children">{children}</div>

        </div>
    )
);

// 活动状态
interface ActivityStatusProps {
    status: 0 | 1 | 10;
    children: React.ReactNode;
}

export const ActivityStatus: FC<ActivityStatusProps> = ({
    status = 0,
    children,
}: ActivityStatusProps): JSX.Element => {
    switch (status) {
        case 0: {
            return (
                <div className="activity-status">
                    <Text i18nKey="Activityhasnotstarted">活动未开始</Text>
                </div>
            );
        }
        case 1: {
            return <div className="activity-status">{children}</div>;
        }
        case 10: {
            return (
                <div className="activity-status">
                    <Text i18nKey="Theactivityhasended">活动已结束</Text>
                </div>
            );
        }
        default: {
            return <div className="activity-status">{children}</div>;
        }
    }
};

interface IPrizeItem {
    coinType?: number; // 货币类型 0:象币 1:象豆
    quantity?: number; // 礼物数量
    giftName?: string; // 礼物名称
    giftPicUrl?: string; // 礼物图片
    prizeValue?: number; // 价值
}

// interface IDrawItem {
//     eleCoin?: number; // 象币数
//     integral?: number; // 福气值
//     name?: string; // 奖品名称
//     picUrl?: string; // 图片地址
// }
//
export const PrizeItem: FC<IPrizeItem> = ({
    giftPicUrl = '',
    quantity = 0,
    giftName = '',
    coinType = -1,
    prizeValue = 0,
}: IPrizeItem): JSX.Element => (
    <div className="prize-item-content">
        <div className="prize-item-content-img">
            <Img src={giftPicUrl} className="prize-item-content-img-inner" />
            {quantity > 1 && <div className="prize-item-num">x{quantity}</div>}
        </div>
        <div className={classNames('prize-item-name', { ellipsis: false })}>{giftName}</div>
        <div className={classNames('prize-item-value', { ellipsis: false })}>
            {coinType === 0 && (
                <Text i18nKey="TotalvaluevalueElecoin" options={{ value: prizeValue }} />
            )}
            {coinType === 1 && (
                <Text i18nKey="TotalvaluevalueElecoin" options={{ value: prizeValue }} />
            )}
        </div>
    </div>
);

interface ICoinType {
    coinType?: number; // 货币类型// 0象币 1象豆
    number?: number; // 价值
}

export const CoinType: FC<ICoinType> = ({ coinType = -1, number = 0 }: ICoinType): JSX.Element => {
    switch (coinType) {
        case 0:
            return (
                <span>
                    <Text i18nKey="Elecoin" options={{ value: number }}>
                        x象币
                    </Text>
                </span>
            );

        case 1:
            return (
                <span>
                    <Text i18nKey="Elebean" options={{ value: number }}>
                        x象币
                    </Text>
                </span>
            );
        default:
            return <></>;
    }
};





interface IDialogBox {
    open?: boolean;
    onClose?: () => void;
    onAnimateEnd?: () => void;
    showCloseButton?: boolean;
    showMask?: boolean;
    animate?: boolean;
    className?: string;
    title?: string | React.ReactNode;
    children?: React.ReactChild;
}

// 弹窗盒子 公共
export const DialogBox: FC<IDialogBox> = ({
    open = false,
    className = '',
    title = '',
    onClose = () => {},
    onAnimateEnd = () => {},
    showCloseButton = true,
    showMask = true,
    children,
    animate,
}: IDialogBox): JSX.Element => (
    <Dialog
        open={open}
        onClose={onClose}
        onAnimateEnd={onAnimateEnd}
        showCloseButton={showCloseButton}
        showMask={showMask}
        animate={animate}
    >
        <div className={classNames('Dialog-box', className)}>
            {title && (
                <div className="Dialog-title">
                    {typeof title === 'string' ? <Text i18nKey={title}>{title}</Text> : title}
                </div>
            )}
            <div className="dialog-content">{children}</div>
        </div>
    </Dialog>
);

// 骨架屏
type IListSkeleton = {
    SkeletonNmu?: number;
};
export const ListSkeleton = ({ SkeletonNmu = 4 }: IListSkeleton) => (
    <div className="ListSkeleton-box">
        {new Array(SkeletonNmu).fill('').map((item, index) => (
            <div className="skeleton-item" key={index + item}>
                <div className="skeleton-avatar">
                    {/* <Skeleton variant="circle" width="50px" height="50px" highlightColor="#1e5ede" color="#0b4cd0" /> */}
                    <Skeleton
                        variant="circle"
                        width="50px"
                        height="50px"
                        color="rgba(254, 220, 139, 0.3)"
                        highlightColor="rgba(254, 220, 139, 0.15)"
                    />
                </div>
                <div className="skeleton-content">
                    <Skeleton
                        animation="wave"
                        style={{ marginBottom: '5px' }}
                        width="70%"
                        color="rgba(254, 220, 139,0.3)"
                        highlightColor="rgba(254, 220, 139, 0.15)"
                    />
                    <Skeleton
                        animation="wave"
                        style={{ marginBottom: '5px' }}
                        width="98%"
                        color="rgba(254, 220, 139, 0.3)"
                        highlightColor="rgba(254, 220, 139, 0.15)"
                    />
                    <Skeleton
                        animation="wave"
                        style={{ marginBottom: '5px' }}
                        width="95%"
                        color="rgba(254, 220, 139, 0.3)"
                        highlightColor="rgba(254, 220, 139, 0.15)"
                    />
                </div>
            </div>
        ))}
    </div>
);

type ILoadingStatusBox = {
    loading?: boolean;
    skeletonComponent?: JSX.Element;
    children?: React.ReactNode;
};
// loading状态组件
export const LoadingStatusBox: FC<ILoadingStatusBox> = ({
    children,
    skeletonComponent,
    loading = true,
}: ILoadingStatusBox): JSX.Element => {
    if (loading) {
        return skeletonComponent ? <>{skeletonComponent}</> : <ListSkeleton />;
    }
    return <>{children}</>;
};

// 超值礼包奖品
type IValuePackPrizeItem = {
    itemData: any;
};

export const ValuePackPrizeItem: React.FC<IValuePackPrizeItem> = ({
    itemData = {},
}: IValuePackPrizeItem): JSX.Element => {
    // const [prizeType, setPrizeType] = useState('');
    const GRAND_PRIZE_TYPE_MAP = {
        '0': 'Gifts' || '礼物',
        '1': 'ProfileFrame' || '头像框',
        '2': 'SpeechBadge' || '发言勋章',
        '3': 'Props' || '道具',
        '4': 'Elebeans' || '象豆',
        '5': 'Elecoins' || '象币',
        '6': 'Galapoints' || '盛典积分',
    };
    // useEffect(() => {
    //     if (String(itemData.rewardType)) {
    //         if (GRAND_PRIZE_TYPE_MAP[itemData.rewardType]) {
    //             setPrizeType(intl.get(GRAND_PRIZE_TYPE_MAP[itemData.rewardType]));
    //         }
    //     }
    // }, [itemData]);
    const typeRendering = () => {
        switch (itemData.rewardType) {
            // 礼物
            case 0: {
                return (
                    <p className="prizeItem-det">
                        {itemData.amount}
                        <Text i18nKey="Elecoins">象币</Text>
                    </p>
                );
            }
            // 头像挂件
            case 1: {
                return (
                    <p className="prizeItem-det">
                        <Text i18nKey="valueHour" options={{ value: itemData.amount }}>
                            x小时
                        </Text>
                    </p>
                );
            }
            case 2: {
                return (
                    <p className="prizeItem-det">
                        <Text i18nKey="valueHour" options={{ value: itemData.amount }}>
                            x小时
                        </Text>
                    </p>
                );
            }
            case 3: {
                return (
                    <p className="prizeItem-det">
                        {itemData.amount}
                        <Text i18nKey="StarlightValue">星光值</Text>
                    </p>
                );
            }
            case 4: {
                return (
                    <p className="prizeItem-det">
                        {itemData.amount}
                        <Text i18nKey="Elebeans">象豆</Text>
                    </p>
                );
            }
            // 盛典积分
            case 6: {
                return (
                    <p className="prizeItem-det">
                        {itemData.amount}
                        <Text i18nKey="Galapoints"> 盛典积分</Text>
                    </p>
                );
            }

            default: {
                return <></>;
            }
        }
    };

    const numRendering = () => <span>x{itemData.num}</span>;

    return (
        <div className="prizeItem-box">
            <div className="prizeItem-img">
                {itemData.picUrl ? (
                    <Img src={itemData.picUrl || ''} className="prizeItem-img-con-m" />
                ) : (
                    ''
                )}
                {itemData.rewardType !== 4 && itemData.rewardType !== 6 && (
                    <div className="prizeItem-type">
                        {typeof itemData.rewardType === 'number' && (
                            <Text i18nKey={GRAND_PRIZE_TYPE_MAP[itemData.rewardType]}>-</Text>
                        )}
                    </div>
                )}
            </div>

            <div className="prizeItem-name">
                {itemData.prizeName} {itemData.num && itemData.num > 1 ? numRendering() : ''}
            </div>

            {String(itemData.rewardType) ? typeRendering() : ''}
        </div>
    );
};

// 等级
type IDateGift = {
    daySelect: number;
    list: Array<any>;
    switchFn: (data: any) => void;
};

export const DateGift: React.FC<IDateGift> = observer(
    ({ daySelect = 1, list = [], switchFn = () => {} }: IDateGift): JSX.Element => {
        const [dayRewardList, setDayRewardList] = useState([]);
        const [action, setAction] = useState(-1);
        useEffect(() => {
            let val = daySelect;
            if (val < 1) {
                val = 1;
            } else if (val > 7) {
                val = 7;
            }
            setAction(val);
            dealDataFn(daySelect);
        }, [daySelect]);

        useEffect(() => {
            dealDataFn(action);
        }, [action]);

        const dealDataFn = (day) => {
            list.forEach((item) => {
                if (day === item.day) {
                    setDayRewardList(item.dayReward);
                    switchFn(item);
                }
            });
        };

        return (
            <div className="date-gift-main">
                <div className="grand-buy-prase">
                    <Text i18nKey="Dailycheckinrewardforthefollo70">后续7天每天签到奖励</Text>
                </div>
                <div className="date-gift-ul">
                    {list.map((item: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                setAction(item.day);
                            }}
                            // eslint-disable-next-line no-nested-ternary
                            className={classNames(
                                'date-gift-li',
                                daySelect >= item.day
                                    ? item.receiveStatus === 1
                                        ? 'date-gift-li-inpast'
                                        : 'date-gift-li-inpast-no'
                                    : '',
                                action === item.day ? 'date-gift-li-action' : ''
                            )}
                        >
                            <span>
                                {daySelect >= item.day && item.receiveStatus === 1 ? (
                                    <div className="check" />
                                ) : (
                                    <>
                                        Day
                                        {item.day}
                                    </>
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="date-gift-content">
                    {dayRewardList.map((item, index) => (
                        <div key={index} className="date-gift-content-li">
                            <ValuePackPrizeItem itemData={item} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);




// 主播信息
interface IFanchorInfo {
    avatarPicUrl: string;
    nickName: string;
    loading: boolean;
    children?: React.ReactNode;
}

export const AnchorInfo: FC<IFanchorInfo> = ({
    avatarPicUrl = '',
    nickName = '',
    loading = true,
    children,
}: IFanchorInfo): JSX.Element => {
    if (loading) {
        return (
            <div className="base-anchor anchor-skeleton">
                <Skeleton
                    style={{ marginRight: '20px' }}
                    variant="circle"
                    width={110}
                    height={110}
                />
                <div>
                    <Skeleton variant="text" width={110} height={60} />
                    <Skeleton variant="text" width={200} height={48} />
                </div>
            </div>
        );
    }
    return (
        <div className="base-anchor">
            <div className="anchor-img-wrap">
                {avatarPicUrl ? (
                    <Img src={avatarPicUrl} className="anchor-img" xOssProcess="1x" />
                ) : (
                    <Img src={new URL('@Assets/images/common/xwyd.png',import.meta.url).href} className="anchor-no" />
                )}
            </div>
            <div className="anchor-info">
                <div className="anchor-name">{nickName || '-'}</div>
                {children}
            </div>
        </div>
    );
};

interface EcoinValueMapProps {
    value?: number;
}

export const CoinValueMap: FC<EcoinValueMapProps> = ({ value }: EcoinValueMapProps) => {
    switch (value) {
        case 0:
            return <Text i18nKey="Elecoin">象币</Text>;
        case 1:
            return <Text i18nKey="Elebean">象豆</Text>;
        default:
            return <Text i18nKey="Hours">小时</Text>;
    }
};

export const MedalTypeMap: FC<EcoinValueMapProps> = ({ value }: EcoinValueMapProps) => {
    switch (value) {
        case 2:
            return <Text i18nKey="SpeechMedal">发言勋章</Text>;
        case 3:
            return <Text i18nKey="AvatarFrame">头像框</Text>;
        case 1:
            return <Text i18nKey="Gifts">礼物</Text>;
        default:
            return <></>
    }
};
