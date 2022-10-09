import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import Text from '@Components/Text';
import Img from 'elelive-ui/es/Components/Img';
import Progress from 'elelive-ui/es/Components/Progress';
import Header from '@Components/Header';
import appStore from '@Stores/appStore';
import Award from './award';
import { plusVersion } from '@Utils/index';
import { useSkeletonState } from '../../hooks';
import api from '@Lib/api';
import IndexSkeleton from './skeleton';
import './index.scss';
import classNames from 'classnames';

const Index: FC = (): JSX.Element => {
    const { anchor_id, anchorId } = appStore.params;
    const { data, isLoading } = api.useDetail({
        anchorId: anchorId || anchor_id,
    });

    const { data: list, isLoading: listLoading } = api.useList(
        {
            levelType: data?.levelType || 1,
        },
        !!data?.nickName,
    );

    const skeletonState = useSkeletonState([isLoading, listLoading]);

    const [headerClass, setHeaderClass] = useState<string>('');

    const scrollMonitor = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 40) {
            setHeaderClass('header-on');
        } else {
            setHeaderClass('');
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollMonitor);
        return () => {
            document.removeEventListener('scroll', scrollMonitor);
        };
    }, []);

    const medalList = [
        {
            title: 'Lv1～Lv10',
            num: '10',
            img: 'index-box-head-level1',
        },
        {
            title: 'Lv11～Lv20',
            num: '20',
            img: 'index-box-head-level2',
        },
        {
            title: 'Lv21～Lv30',
            num: '30',
            img: 'index-box-head-level3',
        },
        {
            title: 'Lv31～Lv40',
            num: '40',
            img: 'index-box-head-level4',
        },
    ];

    const levelClass = ['index-box-head-level1', 'index-box-head-level2', 'index-box-head-level3', 'index-box-head-level4'];
    const levelArr = [-1, 10, 20, 30];
    const [bgClass, setBgClass] = useState('');

    useEffect(() => {
        if (data && String(data?.anchorLevel)) {
            for (let i = levelArr.length - 1; i >= 0; i--) {
                if (data.anchorLevel > levelArr[i]) {
                    setBgClass(levelClass[i]);
                    break;
                }
            }
        }
    }, [data]);

    if (skeletonState) return <IndexSkeleton />;

    return (
        <div className='index'>
            <Header title={<Text i18nKey='VJLevel'>主播等级</Text>} className={headerClass} />

            {data.contracted ? (
                <div className='index-box'>
                    <div className='index-box-head'>
                        <Img src={data.image} webp={false} className='index-box-head-img' />
                        <div className={classNames('index-box-head-level', bgClass)}>
                            <span>{data.anchorLevel}</span>
                        </div>
                    </div>
                    <div className='index-box-lv'>Lv{data.anchorLevel}</div>
                    <div className='index-box-name'>{data.nickName}</div>
                    <Progress allValue={data.allPoints - data.nowLevelPoints} haveValue={data.totalPoints - data.nowLevelPoints} className='index-progress' />
                    <div className='index-min-text'>
                        <div>
                            <Text i18nKey='CurrentExperienceValue'>当前经验值</Text> <span className='index-min-text-yellow'>{data.totalPoints - data.nowLevelPoints}</span>
                        </div>
                        <div className='index-min-text-right'>
                            <Text i18nKey='TheNextLevelNeeds'>距离下一级还需</Text> <span className='index-min-text-yellow'>{data.allPoints - data.totalPoints}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='index-box'>
                    <div className='index-box-head index-box-head-no-border'>
                        <Img src={data.image} webp={false} className='index-box-head-img' />
                    </div>
                    <div className='index-box-no-lv'>
                        <Text i18nKey='NoncontractedVJ'>非签约主播</Text>
                    </div>
                    <div className='index-box-name index-box-name2'>{data.nickName}</div>
                    <div className='index-box-no-footer'>
                        <Text i18nKey='NoncontractedVJsHaveNoVJLevel'>非签约主播没有主播等级哦～</Text>
                    </div>
                </div>
            )}

            <div className='index-con'>
                <h2 className='index-tit'>
                    <Text i18nKey='WhatIsVJLevel'>什么是主播等级</Text>
                </h2>
                <p className='index-p'>
                    <Text i18nKey='VJLevelIsOneOfTheIdentityChara'>
                        主播等级是小象主播的身份特征之一。
                        等级越高的主播，越能受到主播及其他用户的青睐。当主播达到相应等级所需的经验值时，就能提升至相应等级，并享受对应等级特权奖励。
                    </Text>
                </p>
                <h2 className='index-tit'>
                    <Text i18nKey='HowToImproveTheVJLevel'>主播等级如何提升</Text>
                </h2>
                <p className='index-p'>
                    <Text i18nKey='GainGiftsToIncreaseExperienceV'>获取礼物增加经验值：主播收到的礼物对应的星星币，增加同等经验值。1星星=1经验值</Text>
                </p>
                <p className='index-p'>
                    <Text i18nKey='BroadcastingTimeToIncreaseExpe'>开播时长增加经验值：每直播1分钟，获得1经验值，每周最多可获得2000经验值</Text>
                </p>
                <p className='index-p'>
                    <Text i18nKey='UsersJoiningTheVJsFanGroupForT'>粉丝团涨粉增加经验值：用户首次加入主播粉丝团，增加300经验值</Text>
                </p>

                <h2 className='index-tit'>
                    <Text i18nKey='VJLevelMedal'>主播等级勋章</Text>
                </h2>
                <div className='index-level-medal'>
                    {medalList.map((item, i) => {
                        return (
                            <div className='index-level-medal-li' key={`medal-${i}`}>
                                <div className={classNames('index-level-medal-li-top', item.img)}>
                                    {/*<Img src={item.img} className='index-level-medal-li-img'/>*/}
                                    <span>{item.num}</span>
                                </div>
                                <div className='index-level-medal-bottom'>{item.title}</div>
                            </div>
                        );
                    })}
                </div>
                <h2 className='index-tit'>
                    <Text i18nKey='VJLevelReward'>主播等级奖励</Text>
                </h2>
                <p className='index-p'>
                    <Text i18nKey='VJsReachCertainLevelsCanGetCor'>达到一定的主播等级可以获取对应的奖励，等级越高，获得的奖励越多。</Text>
                </p>
                <Award list={list} />

                <h2 className='index-tit'>
                    <Text i18nKey='OthersAndRules'>其他及规则</Text>
                </h2>
                <p className='index-p'>
                    <Text i18nKey='WhenTheVJStopsBroadcastingFor3'>1. 当主播连续30天停播时，从第31日起，每日经验值掉2%。</Text>
                </p>
                <p className='index-p'>
                    <Text i18nKey='RadioLiveBroadcastPrivilegeWhe'>
                        2. 电台直播特权：主播达成相应等级时可申请一次电台直播特权，不限制在什么时候申请，但申请天数必须为连续的x天。
                    </Text>
                </p>
                <p className='index-p'>
                    <Text i18nKey='AllAwardsHaveASpecificPeriodAn'>3. 所有奖励均有特定期限，等级奖励在主播首次达成等级后发放，不会重复发放。</Text>
                </p>
                <p className='index-p'>
                    <Text i18nKey='TheFinalInterpretationRightOfT'>4. 主播等级相关规则最终解释权归小象直播所有。</Text>
                </p>
            </div>
        </div>
    );
};

export default Index;
