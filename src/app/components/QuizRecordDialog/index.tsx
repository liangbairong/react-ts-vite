import React, { useState, memo, useEffect, useRef } from 'react';
import Dialog from 'elelive-ui/es/Components/Dialog';
import LoadMore from 'elelive-ui/es/Components/LoadMore';
import { TabContent } from '../TabContent';
import api from '@Lib/api';
import classNames from 'classnames';
import Box from '../Box';
import appStore from '../../stores/appStore';
import Vs from '../Vs';
import './index.scss';
import { useCallbackState } from '../../hooks';
import reactI18n from 'min-react-i18n';
import { HEADER_TEXT_MAP } from '../../utils/constMap';
import dayjs from 'dayjs';
import { plusVersion } from '../../utils';
import Text from '../Text';
import Empty from 'elelive-ui/es/Components/Empty';
import Img from 'elelive-ui/es/Components/Img';
import QuizRecordSkeleton from './skeleton';

interface IBetDialog<T = any> {
    open: boolean;
    setOpen?: any;
    onCallback?: (data: T) => void;
}

type T = any;
const useAllRecord = (apiHttp: any) => {
    const [pageNo, setPageNo] = useCallbackState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState<Array<any>>([]);
    const loadMoreRef: React.MutableRefObject<T | null> = useRef<T>(null);
    const [loadingState, setLoadingState] = useState(false);
    const typeTemplate: ITypeTemplate = {
        //胜负
        1: (item) => {
            return (
                <div>
                    {item.concedeBallTeam}让球{item.concedeBallNum} {item.winTeam}
                    <Text i18nKey='Win'>胜</Text>
                </div>
            );
        },
        //大小
        2: (item) => {
            return (
                <div>
                    <Text i18nKey='DelimitationValue'>界定值</Text> {item.delimitValue}
                    <div>{item.largeBall === 1 ? <Text i18nKey='BigBall'>大球</Text> : <Text i18nKey='SmallBall'>小球</Text>}</div>
                </div>
            );
        },
        //比分
        3: (item) => {
            return <div>{item.scoreStr}</div>;
        },
        //单双
        4: (item) => {
            return <div>{item.singleNumber === 1 ? <Text i18nKey='OddNumber'>单数</Text> : <Text i18nKey='EvenNumber'>双数</Text>}</div>;
        },

        //最佳球队
        5: (item) => {
            return (
                <div>
                    <span className='AllRecord-list-li-num'> {item.participateNum}</span>
                    <Text i18nKey='Points'>积分</Text>
                </div>
            );
        },
    };
    useEffect(() => {
        setIsLoading(true);
        getList(pageNo);
    }, []);

    const getList = (value: number) => {
        apiHttp({
            pageNo: value,
            pageSize: 20,
        }).then((res: any) => {
            if (res.records.length > 0) {
                const t = JSON.parse(JSON.stringify(list));
                res.records.forEach((item: any) => {
                    t.push(item);
                });
                setList(t);
                setLoadingState(false);
            }
            loadMoreRef?.current?.loadingControl(false);
            setIsLoading(false);
        });
    };
    const onLoadMore = () => {
        if (loadingState) {
            return;
        }
        setLoadingState(true);
        loadMoreRef.current.loadingControl(true);
        setPageNo(pageNo + 1, (value: number) => {
            getList(value);
        });
    };

    return {
        list,
        isLoading,
        typeTemplate,
        loadMoreRef,
        onLoadMore,
    };
};

interface ITypeTemplate {
    [keys: number]: (item: any) => React.ReactNode;
}

const AllRecord = () => {
    const { list, typeTemplate, isLoading, loadMoreRef, onLoadMore } = useAllRecord(api.guessParticipatedRecord);

    if (isLoading) return <QuizRecordSkeleton />;
    return (
        <>
            {/*//选择队伍*/}
            {list.length === 0 ? (
                <div className='AllRecord-no-box'>
                    <Empty
                        image={plusVersion('images/common/status_noRecords.png')}
                        description={<Text i18nKey='NotParticipatedInTheQuiz'>暂未参与竞猜</Text>}
                        className='no-empty'
                    />
                </div>
            ) : (
                <div className='AllRecord-load-more'>
                    <LoadMore height={'90.5vw'} key={'allRecord'} onLoadMore={onLoadMore} cRef={loadMoreRef}>
                        <ul className='AllRecord-list'>
                            {list.map((item: any, i: number) => {
                                return (
                                    <li key={`AllRecord-list-${i}`} className='AllRecord-list-li'>
                                        <div className='AllRecord-list-li-item1'>
                                            <div>
                                                <div className='AllRecord-list-time'>{item.time && dayjs(item.time).format('MM-DD HH:mm:ss')}</div>

                                                {item.guessType === 6 || item.guessType === 5 ? (
                                                    <>
                                                        {item.guessType === 5 && (
                                                            <div className='AllRecord-list-player'>
                                                                <Img src={item?.teamA?.icon} webp={false} className='AllRecord-list-player-img' />
                                                                <div className='AllRecord-list-player-name'>{item?.teamA?.name}</div>
                                                            </div>
                                                        )}
                                                        {item.guessType === 6 && (
                                                            <div className='AllRecord-list-player'>
                                                                <Img src={item?.player?.icon} webp={false} className='AllRecord-list-player-img' />
                                                                <div className='AllRecord-list-player-name'>{item?.player?.name}</div>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Vs data={item} className='AllRecord-list-vs' />
                                                )}
                                            </div>
                                        </div>
                                        <div className='AllRecord-list-li-item2'>
                                            <div className='AllRecord-list-li-tit'>{reactI18n.get(HEADER_TEXT_MAP[item.guessType])}</div>
                                            <div>{typeTemplate[item.guessType] && typeTemplate[item.guessType](item)}</div>
                                            {item.guessType !== 6 && item.guessType !== 5 && (
                                                <>
                                                    <div>
                                                        {item.bonusTimes}
                                                        <Text i18nKey='TimesOfRewards'>奖励倍数</Text>
                                                    </div>
                                                    {item.participateType === 1 && (
                                                        <div>
                                                            <span className='AllRecord-list-li-num'>{item.participateNum}</span>
                                                            <Text i18nKey='Points'>积分</Text>
                                                        </div>
                                                    )}
                                                    {item.participateType === 2 && (
                                                        <div>
                                                            <span className='AllRecord-list-li-num2'>{item.participateNum}</span>
                                                            <Text i18nKey='DiamondBall'>钻石球</Text>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </LoadMore>
                </div>
            )}
        </>
    );
};

const SuccRecord = () => {
    const { list, typeTemplate, isLoading, loadMoreRef, onLoadMore } = useAllRecord(api.guessSuccessfulRecord);

    const { language } = appStore.appSystemInfo;
    if (isLoading) return <QuizRecordSkeleton />;
    return (
        <>
            {list.length === 0 ? (
                <div className='AllRecord-no-box'>
                    <Empty
                        image={plusVersion('images/common/status_noRecords.png')}
                        description={<Text i18nKey='NoQuizSuccessRecord'>暂无竞猜成功记录</Text>}
                        className='no-empty'
                    />
                </div>
            ) : (
                <div className='AllRecord-load-more'>
                    {/*//选择队伍*/}
                    <LoadMore height={'90.5vw'} key={'succRecord'} cRef={loadMoreRef}>
                        <ul className='AllRecord-list AllRecord-list-succ'>
                            {list.map((item: any, i: number) => {
                                return (
                                    <li key={`SuccRecord-list-${i}`} className={classNames('AllRecord-list-succ-li')}>
                                        <div className='AllRecord-list-succ-li-top'>
                                            <div>
                                                <div className='AllRecord-list-time'>
                                                    <span className='AllRecord-list-time-span'>
                                                        <Text i18nKey='StartTime'>开赛时间</Text>{' '}
                                                    </span>
                                                    {item.startTime && dayjs(item.startTime).format('MM-DD HH:mm')}
                                                </div>

                                                <Vs data={item} className='AllRecord-list-vs' />
                                            </div>
                                        </div>
                                        <ul>
                                            {item.details.map((item2: any, i2: number) => {
                                                return (
                                                    <li className='SuccRecord-det-li' key={`SuccRecord-list-${i}-${i2}`}>
                                                        <div className='SuccRecord-det-li-tit'>{reactI18n.get(HEADER_TEXT_MAP[item2.guessType])}</div>
                                                        <div className='SuccRecord-det-li-con'>{typeTemplate[item2.guessType] && typeTemplate[item2.guessType](item2)}</div>

                                                        <div className='SuccRecord-det-li-row'>
                                                            <div>
                                                                <Text i18nKey='ParticipationPoints'>参与积分</Text>{' '}
                                                                <span className='SuccRecord-det-li-row-num'>{item2.participatedIntegral}</span>
                                                            </div>
                                                            <div>
                                                                <Text i18nKey='ParticipationDiamondBalls'>参与钻石球</Text>
                                                                <span className='SuccRecord-det-li-row-num2'>{item2.participatedDiamond}</span>
                                                            </div>
                                                        </div>
                                                        <div className='SuccRecord-det-li-row'>
                                                            <div>
                                                                <Text i18nKey='RewardPoints'>奖励积分</Text>
                                                                <span className='SuccRecord-det-li-row-num'>{item2.awardIntegral}</span>
                                                            </div>
                                                            <div>
                                                                <Text i18nKey='RewardElecoin'>奖励象币</Text>
                                                                <span className='SuccRecord-det-li-row-num3'>{item2.awardEleCoin}</span>
                                                            </div>
                                                        </div>
                                                        <div className='SuccRecord-det-li-footer'>
                                                            {/*免错卡*/}
                                                            {item2.usedErrorFreeCard === 1 && (
                                                                <Img
                                                                    src={{
                                                                        'zh-CN': plusVersion('/images/quizPoints/mc.png'),
                                                                        'zh-TW': plusVersion('/images/quizPoints/mc.png'),
                                                                        en: plusVersion('/images/quizPoints/mc-en.png'),
                                                                        id: plusVersion('/images/quizPoints/mc-en.png'),
                                                                        vi: plusVersion('/images/quizPoints/mc-en.png'),
                                                                    }}
                                                                    language={language || 'en'}
                                                                    className='SuccRecord-det-li-buff'
                                                                />
                                                            )}
                                                            {/*buff卡*/}
                                                            {item2.usedBuffCard === 1 && (
                                                                <Img
                                                                    src={{
                                                                        'zh-CN': plusVersion('/images/quizPoints/BUFF.png'),
                                                                        'zh-TW': plusVersion('/images/quizPoints/BUFF.png'),
                                                                        en: plusVersion('/images/quizPoints/BUFF-en.png'),
                                                                        id: plusVersion('/images/quizPoints/BUFF-en.png'),
                                                                        vi: plusVersion('/images/quizPoints/BUFF-en.png'),
                                                                    }}
                                                                    language={language || 'en'}
                                                                    className='SuccRecord-det-li-buff'
                                                                />
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </LoadMore>
                </div>
            )}
        </>
    );
};

const useQuizRecordDialog = ({ open, setOpen }: IBetDialog) => {
    const list = [
        {
            label: <Text i18nKey='ParticipationRecords'>参与记录</Text>,
            value: 'join',
            path: 'join',
        },
        {
            label: <Text i18nKey='QuizSuccessRecords'>竞猜成功记录</Text>, // 夺宝结果
            value: 'result',
            path: 'result',
        },
    ];
    return {
        list,
        open,
        setOpen,
    };
};

const QuizRecordDialog = (props: IBetDialog) => {
    const { list, open, setOpen } = useQuizRecordDialog(props);
    // const [tab, setTab] = useState('join');
    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            showCloseButton
            showMask
            maskClosable
            isBescroll
            className={'dialog-daily'}>
            <Box
                className={classNames('QuizRecordDialog')}
                type={2}
                title={
                    <div>
                        <Text i18nKey='MyQuizRecords'>我的竞猜记录</Text>
                    </div>
                }>
                <TabContent
                    urlKey='lootDialogTab'
                    tabTitle={list}
                    tabMenuBoxClassName='lootDialogTab_main'
                    tabMenuClassName='lootDialogTab_tab'
                    contentClassName='lootDialogTab_inner'>
                    <AllRecord />
                    <SuccRecord />
                </TabContent>
            </Box>
        </Dialog>
    );
};

export default memo(QuizRecordDialog);
