import React, { useState, useCallback, useEffect, memo, useRef } from 'react';
import reactI18n from 'min-react-i18n';
import Dialog from 'elelive-ui/es/Components/Dialog';
import Toast from 'elelive-ui/es/Components/Toast';
import qpStore from '@Stores/qpStore';
import Radio from '../Radio';
import api from '@Lib/api';
import Box from '../Box';
import classNames from 'classnames';
import { getUuid } from '@Utils/index';
import appStore from '@Stores/appStore';
import { HEADER_TEXT_MAP } from '@Utils/constMap';
import { observer } from 'mobx-react-lite';
import { mutate } from 'swr';
import { NotPointsDialog, NotBallDialog } from './errorDialog';
import './index.scss';
import Img from 'elelive-ui/es/Components/Img';
import { plusVersion } from '../../utils';
import Text from '../Text';
import NumInput from '../NumInput';
interface IList {
    title: string;
    value: number;
}

interface IUsePublicWay {
    type: number;
}

const usePublicWay = ({ type }: IUsePublicWay) => {
    const list = [
        {
            title: <Text i18nKey='DiamondBall'>钻石球</Text>,
            value: 2,
        },
        {
            title: <Text i18nKey='Points'>积分</Text>,
            value: 1,
        },
    ];
    const { participateType, card } = qpStore;
    const [num, setNum] = useState<string | number>('');

    useEffect(() => {
        if (type === 5) {
            qpStore.setParticipateType(1);
        }
    }, [type]);

    const onCutTab = (item: IList) => {
        qpStore.setParticipateType(item.value);
        setNum('');
        qpStore.setParticipateNum(0);
        qpStore.setCard({
            buff: 0,
            freeError: 0,
        });
    };

    // const onGetNum = (e: any) => {
    //     const v = Number(e.target.value.replace(/[^0-9]/g, ''));
    //     setNum(v);
    //     qpStore.setParticipateNum(v);
    // };

    const onGetNum = (obj: any) => {
        setNum(obj);
        qpStore.setParticipateNum(obj);
    };
    const onInputBlur = () => {};

    const onCut = (type: number) => {
        if (type === 1) {
            qpStore.setCard({
                ...card,
                freeError: card.freeError ? 0 : 1,
            });
        } else {
            qpStore.setCard({
                ...card,
                buff: card.buff ? 0 : 1,
            });
        }
    };

    return {
        type,
        list,
        num,
        participateType,
        card,
        onCutTab,
        onGetNum,
        onInputBlur,
        onCut,
    };
};

const PublicWay = observer((props: IUsePublicWay) => {
    const { type, list, num, participateType, card, onCutTab, onGetNum, onInputBlur, onCut } = usePublicWay(props);
    const { userWallet } = qpStore;
    const { anchorId } = appStore.params;
    const { language } = appStore.appSystemInfo;
    return (
        <div>
            {type === 5 ? (
                <></>
            ) : (
                <>
                    <div className='BetDialog-plugin'>
                        <Text i18nKey='PleaseChooseTheParticipateMeth'>请选择参与方式</Text>
                    </div>
                    <div className='way-list'>
                        {list.map((item: any, i: number) => {
                            return (
                                <div
                                    key={`way-title-${i}`}
                                    className={classNames('way-li', item.value === participateType ? 'way-li-action' : '')}
                                    onClick={() => {
                                        onCutTab(item);
                                    }}>
                                    <span className='way-li-radio' />
                                    {item.title}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <NumInput
                className={classNames('control-input', participateType === 2 ? 'control-input-action' : '')}
                placeholder={participateType === 2 ? reactI18n.get('FillInParticipationPoints2') || '填写参与钻石球' : reactI18n.get('FillInParticipationPoints') || '填写参与积分'}
                value={num}
                container={anchorId ? '.BetDialog' : ''}
                maxLength={10}
                onInputChange={onGetNum}
                onInputBlur={onInputBlur}
            />
            {/*<input*/}
            {/*    className={classNames('control-input', participateType === 2 ? 'control-input-action' : '')}*/}
            {/*    type='tel'*/}
            {/*    placeholder={participateType === 2 ? reactI18n.get('FillInParticipationPoints2') || '填写参与钻石球' : reactI18n.get('FillInParticipationPoints') || '填写参与积分'}*/}
            {/*    value={num}*/}
            {/*    maxLength={10}*/}
            {/*    onChange={onGetNum}*/}
            {/*    onBlur={onInputBlur}*/}
            {/*/>*/}

            {participateType === 2 && (
                <div className='way-gulp'>
                    <div>
                        <Text i18nKey='PleaseChooseTheParticipateMeth'>请选择参与方式</Text>
                        <Text i18nKey='IfYouSucceedInTheQuizYouWillGe'>竞猜成功将会获得相应倍数的象币奖励</Text>
                    </div>
                    <div>
                        <Text i18nKey='TheDiamondBallsLeftCannotBeUse'>世界杯决赛开始时钻石球将会被清空，请及时使用哦</Text>
                    </div>
                    <div>
                        <Text i18nKey='当前剩余钻石球'>当前剩余钻石球</Text>
                        <span className='way-gulp-num'>{userWallet.diamond}</span>
                    </div>
                </div>
            )}
            {participateType === 1 && (
                <div>
                    <div className='way-gulp'>
                        <div>
                            <Text i18nKey='IfYouSucceedInTheQuizYouWillGe'>竞猜成功将会获得相应倍数的积分奖励</Text>
                        </div>
                        <div>
                            <Text i18nKey='PointsLeft'>当前剩余积分</Text> <span className='way-gulp-num'>{userWallet.integral}</span>
                        </div>
                    </div>
                    <div className='way-card'>
                        <ul>
                            {userWallet?.errorFreeCardAvailable === 1 && userWallet.pardon > 0 && (
                                <li>
                                    <div className='way-card-buff'>
                                        <Img
                                            src={{
                                                'zh-CN': plusVersion('/images/quizPoints/mc.png'),
                                                'zh-TW': plusVersion('/images/quizPoints/mc.png'),
                                                en: plusVersion('/images/quizPoints/mc-en.png'),
                                                id: plusVersion('/images/quizPoints/mc-en.png'),
                                                vi: plusVersion('/images/quizPoints/mc-en.png'),
                                            }}
                                            language={language || 'en'}
                                            className='way-card-buff-img'
                                        />
                                    </div>
                                    <div className='way-card-name'>
                                        <Text i18nKey='UseTheErrorfreeCard'>使用免错卡</Text>
                                    </div>
                                    <Radio
                                        checked={card.freeError}
                                        onCut={() => {
                                            onCut(1);
                                        }}
                                    />
                                </li>
                            )}
                            {userWallet?.buffCardAvailable === 1 && userWallet.buffCard > 0 && (
                                <li>
                                    <div className='way-card-buff'>
                                        <Img
                                            src={{
                                                'zh-CN': plusVersion('/images/quizPoints/BUFF.png'),
                                                'zh-TW': plusVersion('/images/quizPoints/BUFF.png'),
                                                en: plusVersion('/images/quizPoints/BUFF-en.png'),
                                                id: plusVersion('/images/quizPoints/BUFF-en.png'),
                                                vi: plusVersion('/images/quizPoints/BUFF-en.png'),
                                            }}
                                            language={language || 'en'}
                                            className='way-card-buff-img'
                                        />
                                    </div>
                                    <div className='way-card-name'>
                                        <Text i18nKey='UseTheBUFFCard'>使用BUFF卡</Text>
                                    </div>
                                    <Radio
                                        checked={card.buff}
                                        onCut={() => {
                                            onCut(2);
                                        }}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
});

interface IBetDialog {
    open: boolean;
    setOpen?: any;
    type: number;
    onCallback?: () => void;
}
const useBetDialog = ({ open, setOpen, type, onCallback = () => {} }: IBetDialog) => {
    const { betTitle, betItem, curDayData, participateType, userWallet } = qpStore;
    const NotBallDialogRef = useRef<any>(null);
    const NotPointsDialogRef = useRef<any>(null);
    // const [data, setData] = useState<any>({});
    const { uid } = appStore.auth;

    useEffect(() => {
        if (open) {
            api.guessPrepare({
                guessType: type,
                optionId: betItem.id,
                userId: uid,
            }).then((res) => {
                // setData(res);
                qpStore.setUserWallet({
                    ...userWallet,
                    ...res,
                });
            });
            qpStore.setCard({
                buff: 0,
                freeError: 0,
            });

            qpStore.setParticipateNum(0);
        }
    }, [open]);
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    const codeMap: any = {
        0: () => {
            Toast.open({
                content: <Text i18nKey='SuccessfullyParticipated'>已成功参与</Text>,
            });
            onClose();
        },
        1: () => {
            Toast.open({
                content: <Text i18nKey='TheTimesOfRewardsOfTheCurrentO'>当前选项的奖励倍数已变更，请重新查看</Text>,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        2: () => {
            // Toast.open({
            //     content: '可用积分不足',
            // });
            NotPointsDialogRef.current.show(true);
        },
        3: () => {
            // Toast.open({
            //     content: '可用钻石球不足',
            // });
            NotBallDialogRef.current.show(true);
        },
        4: () => {
            Toast.open({
                content: <Text i18nKey='可用免错卡不足'>可用免错卡不足</Text>,
            });
        },
        5: () => {
            Toast.open({
                content: <Text i18nKey='可用buff卡不足'>可用buff卡不足</Text>,
            });
        },
        6: () => {
            Toast.open({
                content: <Text i18nKey='不可使用buff/免错卡'>不可使用buff/免错卡</Text>,
            });
        },
        7: () => {
            Toast.open({
                content: <Text i18nKey='竞猜类型和参与类型不匹配'>竞猜类型和参与类型不匹配</Text>,
            });
        },
        8: () => {
            Toast.open({
                content: <Text i18nKey='选项已下架'>选项已下架</Text>,
            });
        },
        9: () => {
            Toast.open({
                content: <Text i18nKey='ActivityNotStarted'>竞猜未开始</Text>,
            });
        },
        10: () => {
            Toast.open({
                content: <Text i18nKey='ActivityEnded-1'>竞猜已结束</Text>,
            });
        },
        11: () => {
            Toast.open({
                content: <Text i18nKey='同一选项不可多次使用buff卡'>同一选项不可多次使用buff卡</Text>,
            });
        },
        12: () => {
            Toast.open({
                content: <Text i18nKey='球员仅能猜一次'>球员仅能猜一次</Text>,
            });
        },
        13: () => {
            Toast.open({
                content: <Text i18nKey='ASingleParticipationRequiresAt'>单次参与至少需 10 积分或钻石球</Text>,
            });
        },
    };

    const onConfirm = () => {
        const { participateNum, card } = qpStore;
        if (type !== 6) {
            // if (participateNum === 0) {
            //     Toast.open({
            //         content: <Text i18nKey='数量不能为0'>数量不能为0</Text>,
            //     });
            //     return;
            // }
            if (participateNum < 10) {
                Toast.open({
                    content: <Text i18nKey='ASingleParticipationRequiresAt'>单次参与至少需 10 积分或钻石球</Text>,
                });
                return;
            }
        }

        appStore.setLoading(true);
        api.guessParticipate({
            bonusTimes: userWallet?.bonusTimes || betItem.bonusTimes,
            guessType: type, //竞猜类型
            optionId: betItem.id,
            participateNum,
            participateType: type === 6 ? 0 : participateType,
            requestId: getUuid(),
            teamMatchId: curDayData.id,
            useBuffCard: card.buff, //使用buff卡
            useErrorFreeCard: card.freeError, //使用免错卡
            userId: uid,
        }).then((res: any) => {
            if (codeMap[res.code]) {
                codeMap[res.code]();
            }
            if (res.code === 0) {
                qpStore.getUserWallet();
                mutate('/ee/guess/teamMatchDetail');
                // if (type !== 5) {
                //     qpStore.setBetItem({});
                // }
                qpStore.setBetItem({});

                onCallback();
            }
        });
    };

    return {
        type,
        betTitle,
        betItem,
        userWallet,
        NotBallDialogRef,
        NotPointsDialogRef,
        open,
        onClose,
        onConfirm,
    };
};

const BetDialog = observer((props: IBetDialog) => {
    const { type, userWallet, betItem, NotBallDialogRef, NotPointsDialogRef, betTitle, open, onClose, onConfirm } = useBetDialog(props);
    return (
        <>
            <Dialog open={open} showMask maskClosable className={'dialog-daily'}>
                <Box className='BetDialog' type={2} title={<div>{reactI18n.get(HEADER_TEXT_MAP[type])}</div>}>
                    <div className='BetDialog-plugin'>
                        <Text i18nKey='CurrentSelection'>当前选择</Text>
                    </div>
                    <div className='BetDialog-bet-title'>{betTitle}</div>
                    <div className='BetDialog-title'>{betItem?.title}</div>

                    {type === 6 ? (
                        <div className='BetDialog-alone'>
                            <Text i18nKey='EachUserCanOnlySelectOnePlayer'>每位用户仅可选择一名球员，选择后不可更改</Text>
                        </div>
                    ) : (
                        <>
                            <div className='BetDialog-bonusTimes'>
                                <Text i18nKey='YouCanGetValueTimesOfRewardsIf' options={{ value: userWallet?.bonusTimes || betItem?.bonusTimes }}>
                                    竞猜成功可获得x倍奖励
                                </Text>
                            </div>
                            <PublicWay type={type} />
                        </>
                    )}

                    <div className='BetDialog-footer'>
                        <div onClick={onClose} className='BetDialog-btn BetDialog-close-btn'>
                            <Text i18nKey='Cancel'>取消</Text>
                        </div>
                        <div onClick={onConfirm} className='BetDialog-btn BetDialog-confirm-btn'>
                            <Text i18nKey='ParticipateIn'>确认参与</Text>
                        </div>
                    </div>
                </Box>
            </Dialog>
            {/*钻石球*/}
            <NotBallDialog cRef={NotBallDialogRef} />
            {/*积分*/}
            <NotPointsDialog cRef={NotPointsDialogRef} />
        </>
    );
});

export default memo(BetDialog);
