import React, { memo } from 'react';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';
import { plusVersion } from '../../utils';
import appStore from '../../stores/appStore';
import Text from '../Text';

interface IBetBox<T = any> {
    A: T;
    B: T;
    checkedId: string | number;
    onChecked: (obj: T, num: number) => void;
}

const BetBox = ({ A, B, checkedId, onChecked }: IBetBox) => {
    const { language } = appStore.appSystemInfo;
    return (
        <div className='BetBox'>
            <div className='BetBox-li'>
                <div
                    className={classNames(
                        'BetBox-li-box',
                        A.participatedDiamond > 0 || A.participatedIntegral > 0 ? 'BetBox-li-box-len' : '',
                        A.result === 1 ? 'BetBox-li-box-result' : '',
                        A.result === 2 ? 'BetBox-li-box-flat' : '',
                        checkedId === A.id ? 'BetBox-li-box-action' : '',
                    )}
                    onClick={() => {
                        onChecked(A, 1);
                    }}>
                    <div>{A.title}</div>
                    <p className='BetBox-li-box-bonusTimes'>
                        <span className='i18n-value'>{A.bonusTimes}</span>
                        <Text i18nKey='TimesOfRewards'>奖励倍数</Text>
                    </p>
                    {(A.participatedDiamond > 0 || A.participatedIntegral > 0) && (
                        <div className='BetBox-li-my'>
                            <div className='public-my-con'>
                                <span>
                                    <Text i18nKey='IHaveParticipated'>我已参与</Text>
                                </span>
                            </div>
                            <div className='BetBox-li-my-box'>
                                <div>
                                    <Text i18nKey='DiamondBall'>钻石球</Text>
                                    <div className='BetBox-li-my-box-num2'>{A.participatedDiamond}</div>
                                </div>
                                <div>
                                    <Text i18nKey='Points'>积分</Text>
                                    <div className='BetBox-li-my-box-num'>{A.participatedIntegral}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='BetBox-li-box-footer'>
                        {/*buff卡*/}
                        {A.usedBuffCard === 1 && (
                            <Img
                                src={{
                                    'zh-CN': plusVersion('/images/quizPoints/BUFF.png'),
                                    'zh-TW': plusVersion('/images/quizPoints/BUFF.png'),
                                    en: plusVersion('/images/quizPoints/BUFF-en.png'),
                                    id: plusVersion('/images/quizPoints/BUFF-en.png'),
                                    vi: plusVersion('/images/quizPoints/BUFF-en.png'),
                                }}
                                language={language || 'en'}
                                className='BetBox-li-box-buff'
                            />
                        )}
                        {/*免错卡*/}
                        {A.usedErrorFreeCard === 1 && (
                            <Img
                                src={{
                                    'zh-CN': plusVersion('/images/quizPoints/mc.png'),
                                    'zh-TW': plusVersion('/images/quizPoints/mc.png'),
                                    en: plusVersion('/images/quizPoints/mc-en.png'),
                                    id: plusVersion('/images/quizPoints/mc-en.png'),
                                    vi: plusVersion('/images/quizPoints/mc-en.png'),
                                }}
                                language={language || 'en'}
                                className='BetBox-li-box-buff'
                            />
                        )}
                    </div>

                    {A.result === 1 && (
                        <div className='BetBox-li-box-tag'>
                            <Text i18nKey='QuizResult'>竞猜结果</Text>
                        </div>
                    )}
                    {A.result === 2 && (
                        <div className='BetBox-li-box-tag BetBox-li-box-tag-flat'>
                            <Text i18nKey='Draw'>流局</Text>
                        </div>
                    )}
                </div>
            </div>
            <div className='BetBox-li'>
                <div
                    className={classNames(
                        'BetBox-li-box',
                        B.result === 1 ? 'BetBox-li-box-result' : '',
                        B.result === 2 ? 'BetBox-li-box-flat' : '',
                        checkedId === B.id ? 'BetBox-li-box-action' : '',
                    )}
                    onClick={() => {
                        onChecked(B, 2);
                    }}>
                    <div>{B.title}</div>
                    <p className='BetBox-li-box-bonusTimes'>
                        <span className='i18n-value'>{B.bonusTimes}</span>
                        <Text i18nKey='TimesOfRewards'>奖励倍数</Text>
                    </p>
                    {(B.participatedDiamond > 0 || B.participatedIntegral > 0) && (
                        <div className='BetBox-li-my'>
                            <div className='public-my-con'>
                                <span>
                                    <Text i18nKey='IHaveParticipated'>我已参与</Text>
                                </span>
                            </div>
                            <div className='BetBox-li-my-box'>
                                <div>
                                    <Text i18nKey='DiamondBall'>钻石球</Text>
                                    <div className='BetBox-li-my-box-num2'>{B.participatedDiamond}</div>
                                </div>
                                <div>
                                    <Text i18nKey='Points'>积分</Text>
                                    <div className='BetBox-li-my-box-num'>{B.participatedIntegral}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='BetBox-li-box-footer'>
                        {/*buff卡*/}
                        {B.usedBuffCard === 1 && (
                            <Img
                                src={{
                                    'zh-CN': plusVersion('/images/quizPoints/BUFF.png'),
                                    'zh-TW': plusVersion('/images/quizPoints/BUFF.png'),
                                    en: plusVersion('/images/quizPoints/BUFF-en.png'),
                                    id: plusVersion('/images/quizPoints/BUFF-en.png'),
                                    vi: plusVersion('/images/quizPoints/BUFF-en.png'),
                                }}
                                language={language || 'en'}
                                className='BetBox-li-box-buff'
                            />
                        )}
                        {/*免错卡*/}
                        {B.usedErrorFreeCard === 1 && (
                            <Img
                                src={{
                                    'zh-CN': plusVersion('/images/quizPoints/mc.png'),
                                    'zh-TW': plusVersion('/images/quizPoints/mc.png'),
                                    en: plusVersion('/images/quizPoints/mc-en.png'),
                                    id: plusVersion('/images/quizPoints/mc-en.png'),
                                    vi: plusVersion('/images/quizPoints/mc-en.png'),
                                }}
                                language={language || 'en'}
                                className='BetBox-li-box-buff'
                            />
                        )}
                    </div>
                    {B.result === 1 && (
                        <div className='BetBox-li-box-tag'>
                            <Text i18nKey='QuizResult'>竞猜结果</Text>
                        </div>
                    )}
                    {B.result === 2 && (
                        <div className='BetBox-li-box-tag BetBox-li-box-tag-flat'>
                            <Text i18nKey='Draw'>流局</Text>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(BetBox);
