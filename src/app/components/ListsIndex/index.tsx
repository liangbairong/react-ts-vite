import React, { EventHandler, FC, memo } from 'react';

import classNames from 'classnames';

import Skeleton from '@material-ui/lab/Skeleton';

import CountDown from 'elelive-ui/es/Components/CountDown';

import { processingPictureSuffix } from '@Utils/index';

import { IAnchorInfoProps, IUserInfoProps } from '@Stores/starStore';

import appStore from '@Stores/appStore';

import JSBridge from '@Utils/JSBridge';

import { Text } from '../Text/index';

import './index.scss';

type IListTitle = {
    ListTitleArr: string[];
};

type IListDeadLine = {
    endTime: number;
    state: number;
    handCountDownEvent: EventHandler<any>;
    type?: string;
};

type IListType = {
    handleRefresh: EventHandler<any>;
    // state.tsx?: boolean;
} & IListDeadLine;

interface ListsItemsProps {
    rank?: number;
    isFooter?: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    anchorInfo?: IAnchorInfoProps;
    // eslint-disable-next-line react/no-unused-prop-types
    userInfo?: IUserInfoProps;
}

interface ListsBaseProps extends ListsItemsProps {
    type?: string;
}

const getRank = (isFooter, rank) => {
    if (isFooter) {
        return rank > 99 ? '99+' : rank;
    }
    return rank;
};

/**
 * value组件
 */
export const ListsIndex: FC<ListsBaseProps> = memo(
    ({
        type = 'anchor', // anchor 主播榜单榜单，user 用户榜单， union 主播用户联合榜单
        ...props
    }: ListsBaseProps): JSX.Element => {
        switch (type) {
            case 'user':
                return <ListUserIndex {...props} />;
            case 'union':
                return <ListUnionIndex {...props} />;
            default:
                return <ListAnchorIndex {...props} />;
        }
    }
);

// 主播榜单
export const ListAnchorIndex: FC<ListsItemsProps> = memo(
    ({ rank, isFooter, anchorInfo }: ListsItemsProps) => {
        const { image, liveState, name, userId, value, lucker } = anchorInfo || {};

        const handListItemClick = () => {
            if (!userId || isFooter) return;

            const { anchorId } = appStore.params;
            // 这里的uid必须是用户自己的uid，所以需要从auth拿
            const { uid } = appStore.auth;
            /* 先判断是否主播，再判断是否在主播的直播间 */
            if (anchorId === uid || anchorId === userId) {
                return;
            }

            if (liveState === 1) {
                JSBridge.toAppLive(userId, image);
            } else {
                JSBridge.toAppPersonal(userId);
            }
        };

        return (
            <div
                aria-hidden="true"
                className={classNames('lists-item', isFooter ? '' : `lists-item-${rank}`)}
                onClick={() => (userId && userId !== '' && !isFooter ? handListItemClick() : {})}
            >
                <div className="lists-item-index">{getRank(isFooter, rank)}</div>
                <div className="lists-item-content">
                    <div className="lists-item-avatar">
                        <img
                            className={classNames(
                                'lists-item-image',
                                liveState === 1 ? 'lists-item-image-none' : ''
                            )}
                            src={`${processingPictureSuffix(image) || appStore.noneImage}`}
                            alt=""
                        />
                        {liveState === 1 && !isFooter && (
                            <div className="lists-item-type">
                                <Text i18nKey="Living">直播中</Text>
                            </div>
                        )}
                    </div>
                    <div className="lists-item-info">
                        {lucker && (
                            <span className="lists-item-lucker">
                                <Text i18nKey="Lucky">幸运儿</Text>
                            </span>
                        )}
                        <h3 className="lists-item-title">
                            <span>{name || <Text i18nKey="Waitingforyou" />}</span>
                        </h3>
                        {/* { */}
                        {/*  showMvp && isMvp === 1 && !isFooter && ( */}
                        {/*    <span className="lists-item-mvp">MVP</span> */}
                        {/*  ) */}
                        {/* } */}
                    </div>
                </div>
                <div className="lists-item-anchor">
                    <span className="lists-item-value">{value || '-'}</span>
                </div>
            </div>
        );
    }
);

// 用户榜单
export const ListUserIndex: FC<ListsItemsProps> = memo(
    ({ rank, isFooter, userInfo }: ListsItemsProps) => {
        const { image, name, userId, value } = userInfo || {};

        const handListItemClick = () => {
            if (!userId || isFooter) return;

            // 如果是自己则不跳转
            const { uid } = appStore.auth;
            if (uid === userId) return;

            JSBridge.toAppPersonal(userId);
        };

        return (
            <div
                aria-hidden="true"
                className={classNames('lists-item', isFooter ? '' : `lists-item-${rank}`)}
                onClick={() => handListItemClick()}
            >
                <div className="lists-item-index">{getRank(isFooter, rank)}</div>
                <div className="lists-item-content">
                    <div className="lists-item-avatar">
                        <img
                            className="lists-item-image"
                            src={`${image || appStore.noneImage}?x-oss-process=style%2F1x`}
                            alt=""
                        />
                    </div>
                    <div className="lists-item-info">
                        <h3 className="lists-item-title">
                            <span>{name || <Text i18nKey="Waitingforyou" />}</span>
                        </h3>
                    </div>
                </div>
                <div className="lists-item-anchor">
                    <span className="lists-item-value">{value || '-'}</span>
                </div>
            </div>
        );
    }
);

// 联合榜单
export const ListUnionIndex: FC<ListsItemsProps> = memo(
    ({ rank, isFooter, userInfo, anchorInfo }: ListsItemsProps) => {
        const handAnchorItemClick = () => {
            if (!anchorInfo?.userId || isFooter) {
                return;
            }

            const { anchorId } = appStore.params;
            // 这里的uid必须是用户自己的uid，所以需要从auth拿
            const { uid } = appStore.auth;
            /* 先判断是否主播，再判断是否在主播的直播间 */
            if (anchorId === uid || anchorId === anchorInfo?.userId) {
                return;
            }

            if (anchorInfo?.liveState === 1) {
                JSBridge.toAppLive(anchorInfo?.userId, anchorInfo?.image);
            } else {
                JSBridge.toAppPersonal(anchorInfo?.userId);
            }
        };

        const handUserItemClick = () => {
            if (!userInfo?.userId || isFooter) return;

            // 如果是自己则不跳转
            const { uid } = appStore.auth;
            if (uid === userInfo?.userId) return;

            JSBridge.toAppPersonal(userInfo?.userId);
        };

        return (
            <div
                aria-hidden="true"
                className={classNames('lists-item', isFooter ? '' : `lists-item-${rank}`)}
            >
                <div className="lists-item-index">{getRank(isFooter, rank)}</div>
                <div className="lists-item-content" onClick={() => handAnchorItemClick()}>
                    <div className="lists-item-avatar">
                        <img
                            className="lists-item-image"
                            src={`${anchorInfo?.image || appStore.noneImage}`}
                            alt=""
                        />
                        {anchorInfo?.liveState === 1 && !isFooter && (
                            <div className="lists-item-type">
                                <Text i18nKey="Living">直播中</Text>
                            </div>
                        )}
                    </div>
                    <div className="lists-item-info">
                        <h3 className="lists-item-title">
                            <span>{anchorInfo?.name || <Text i18nKey="Waitingforyou" />}</span>
                        </h3>
                        <span className="lists-item-value">{anchorInfo?.value || '-'}</span>
                    </div>
                </div>
                <div className="lists-item-content" onClick={() => handUserItemClick()}>
                    <div className="lists-item-avatar">
                        <img
                            className="lists-item-image"
                            src={`${userInfo?.image || appStore.noneImage}`}
                            alt=""
                        />
                    </div>
                    <div className="lists-item-info">
                        <h3 className="lists-item-title">
                            <span>{userInfo?.name || <Text i18nKey="Waitingforyou" />}</span>
                        </h3>
                        <span className="lists-item-value">{userInfo?.value || '-'}</span>
                    </div>
                </div>
            </div>
        );
    }
);

export const ListDeadLine: FC<IListDeadLine> = memo(
    ({ endTime, state, handCountDownEvent, type }: IListDeadLine) => {
        if (state === 0) {
            return <Text i18nKey="Activityhasnotstarted">活动未开始</Text>;
        }

        if (state === 2 || state === 5) {
            return <Text i18nKey="ThisRoundEnd">本轮已结束</Text>;
        }

        return (
            <>
                <span className="lists-type-text">
                    <Text i18nKey="ToTheEndOfThisRound">距本轮结束</Text>
                </span>
                <div className="lists-type-time">
                    <CountDown
                        ROOT_BASE={ROOT_BASE}
                        endTime={endTime}
                        server
                        onHandCountDownEvent={handCountDownEvent}
                    />
                </div>
            </>
        );
    }
);

export const ListType: FC<IListType> = memo(
    ({ endTime, state, handCountDownEvent, handleRefresh, type }: IListType): JSX.Element => {
        return (
            <div className="lists-type">
                <div className="lists-type-info">
                    <ListDeadLine
                        endTime={endTime}
                        state={state}
                        type={type}
                        handCountDownEvent={handCountDownEvent}
                    />
                </div>
                {endTime - appStore.server.timestamp > 0 && (
                    <div
                        aria-hidden="true"
                        className="lists-type-button"
                        onClick={(event) => handleRefresh(event)}
                    />
                )}
            </div>
        );
    }
);

export const ListTitle: FC<IListTitle> = memo(
    ({ ListTitleArr = [] }: IListTitle): JSX.Element => (
        <div className="lists-title">
            <div className="lists-title-index">
                <Text i18nKey={ListTitleArr[0]} />
            </div>
            <div className="lists-title-content">
                <Text i18nKey={ListTitleArr[1]} />
                <span className="lists-title-text">
                    (<Text i18nKey="Heartbeatvalue" />)
                </span>
            </div>
            <div className="lists-title-content">
                <Text i18nKey={ListTitleArr[2]} />
                <span className="lists-title-text">
                    (<Text i18nKey="Loveandexpressionvalue" />)
                </span>
            </div>
        </div>
    )
);

// 骨架屏
type IListSkeleton = {
    SkeletonNmu?: number;
};

export const AnchorSkeleton = ({ SkeletonNmu = 10 }: IListSkeleton) => (
    <div className="ListSkeleton-box">
        <div className="lists-bg">
            <div className="lists-top">
                <div className="lists-top-step">
                    <Skeleton width={616} height={40} />
                </div>
                <div className="lists-type">
                    <div className="lists-type-info">
                        <Skeleton width={252} height={33} />
                    </div>
                    <div className="lists-type-button">
                        <Skeleton variant="circle" width={36} height={36} />
                    </div>
                </div>
            </div>
            <div className="lists-cons">
                <div className="lists-title">
                    <div className="lists-title-index">
                        <Skeleton width={44} height={33} />
                    </div>
                    <div className="lists-title-content">
                        <Skeleton width={44} height={33} />
                    </div>
                    <div className="lists-title-anchor">
                        <Skeleton width={66} height={33} />
                    </div>
                </div>
                {new Array(SkeletonNmu).fill('').map((item, index) => (
                    <div key={item + index} className="lists-item">
                        <div className="lists-item-index">
                            <Skeleton width={33} height={33} />
                        </div>
                        <div className="lists-item-content">
                            <div className="lists-item-avatar">
                                <Skeleton variant="circle" width={64} height={64} />
                            </div>
                            <div className="lists-item-anchor">
                                <Skeleton width={130} height={36} />
                            </div>
                        </div>
                        <div className="lists-item-anchor">
                            <Skeleton width={66} height={36} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
