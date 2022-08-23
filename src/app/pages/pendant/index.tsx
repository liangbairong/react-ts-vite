import React, { useEffect, useState, useRef, FC } from 'react';

import classNames from 'classnames';



// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/pagination';

import CountDown from 'elelive-ui/es/Components/CountDown';
import Img from 'elelive-ui/es/Components/Img';
import Loading from 'elelive-ui/es/Components/Loading';

import { LangChange, PendantAutoFormat, Text, Progress } from '@Components/index';

import JSBridge from '@Utils/JSBridge';

import { filterParams, getUrlParams } from '@Utils/index';

import appStore from '@Stores/appStore';

import pendantStore from '@Stores/pendantStore';

import { PendantStageContext } from '@Context/index';

import { IProps } from './type';

import Game from './components/game';

import Ending from './components/ending';

import Luck from './components/luck';

import Header from './components/header';

import Settlement from './components/settlement';

import './index.scss';

const APendant: FC<IProps> = (): JSX.Element => {
    // const [realIndex, setRealIndex] = useState<number>(0);
    const [firstRender, serFirstRender] = useState<boolean>(false);
    const [realSwiperAutoPlay, setRealSwiperAutoPlay] = useState<number>(0);
    const [pendantEndTime, setPendantEndTime] = useState(0);
    const [info, setInfo] = useState<any>({});

    const [pendantData, setPendantData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    // 处理国际化名称
    const [language] = useState<any>(
        appStore?.appSystemInfo?.language || appStore?.params?.lang || 'zh-CN'
    );

    const pendantRef: any = useRef();

    const clickHandle = (type: string, taskType?: string) => {
        // JSBridge.sensorsTrack('sweetGuardian', '直播间甜蜜榜单挂件');
        const url = `${
            window.location.href.split('/room_pendant')[0]
        }/index?curTab=${type}&selectTab=${taskType || 'heartDating'}&${filterParams()}`;
        JSBridge.openWebView(url);
    };

    const onRefresh = () => {
        console.log('倒计时组件刷新回调', pendantRef?.current);
        if (pendantRef?.current) {
            pendantRef.current.onRefresh();
        }
    };

    const onPendantCountDownEvent = () => {
        setPendantEndTime(0);
        controlPendantHide();
    };
    const { anchorId } = getUrlParams();
    const pendantProps = {
        pendantKey: 'pendant_room_520',
        cRef: pendantRef,
        requestConfig: {
            method: 'post',
            url: '/ee/loveRank/pendant',
            data: { anchorId },
        },
        callback: (data) => {
            setPendantData(data);
        },
    };

    // 控制挂件隐藏
    const controlPendantHide = () => {
        JSBridge.controlPendantShowAndHide(false);
    };
    // 控制挂件显示
    const controlPendantShow = () => {
        JSBridge.controlPendantShowAndHide(true);
    };

    // const onHandCountDownEvent = () => {
    //     console.log('继承结束结束...');
    // };

    useEffect(() => {
        // 控制第一次加载
        serFirstRender(true);

        // 数据解构
        if (pendantData?.formatData?.data) {
            // 已获取到初始化挂件数据以及接口数据
            const actStartTime =
                pendantData?.formatData?.pendantStartTime || pendantData?.initData?.startTime || 0;
            const actEndTime =
                pendantData?.formatData?.pendantEndTime || pendantData?.initData?.endTime || 0;
            if (actStartTime === 0 || actEndTime === 0) {
                return;
            }
            if (pendantData?.formatData?.currentTime) {
                if (
                    pendantData?.formatData?.data?.state !== 0 && // 活动状态
                    pendantData?.formatData?.currentTime <= actEndTime && // 小于挂件结束时间
                    pendantData?.formatData?.currentTime >= actStartTime // 大于挂件开始时间
                ) {
                    controlPendantShow();
                } else {
                    // 非活动时间
                    controlPendantHide();
                }
            }
            // 时间丢弃
            if (info?.eventTime) {
                if (pendantData?.formatData?.data?.eventTime > info?.eventTime) {
                    setInfo(pendantData?.formatData?.data || {});
                }
            } else {
                setInfo(pendantData?.formatData?.data || {});
            }
            // 控制loading效果
            setLoading(true);
            // 控制挂件时间
            setPendantEndTime(actEndTime);
        }
    }, [pendantData]);

    return (
        <PendantAutoFormat {...pendantProps}>
            {firstRender && (
                <div className={classNames('livePendant')}>
                    {/* {APP_ENV !== 'prod' && <LangChange />} */}

                    <div
                        className="content"
                        onClick={() => {
                            clickHandle('star');
                        }}
                    >
                        <Img
                            src={{
                                'zh-CN': new URL('@Assets/images/pendant/room/top-bg.png',import.meta.url).href,
                                'zh-TW': new URL('@Assets/images/pendant/room/top-bg-tw.png',import.meta.url).href,
                                en: new URL('@Assets/images/pendant/room/top-bg-en.png',import.meta.url).href,
                                id: new URL('@Assets/images/pendant/room/top-bg-id.png',import.meta.url).href,
                                vi: new URL('@Assets/images/pendant/room/top-bg-vi.png',import.meta.url).href,
                            }}
                            language={language}
                            className="livePendant-top"
                        />

                        {loading ? (
                            <div className="livePendant-content">
                                {info?.state === 5 ? (
                                    <Settlement info={info} onRefresh={onRefresh} />
                                ) : (
                                    <div className="livePendant-content-inner">
                                        <Header info={info} />
                                        <Game info={info} onRefresh={onRefresh} />
                                        <Ending info={info} onRefresh={onRefresh} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Loading open />
                        )}
                    </div>

                    {info?.levelPendantDTO && <Luck infoData={info?.levelPendantDTO || {}} />}

                    {/* 挂件结束时间 --不用展示出来 */}
                    <div style={{ display: 'none' }}>
                        pendantEndTime:
                        {pendantEndTime}
                        {pendantEndTime ? (
                            <CountDown
                                key={pendantEndTime}
                                ROOT_BASE={ROOT_BASE}
                                endTime={pendantEndTime}
                                onHandCountDownEvent={onPendantCountDownEvent}
                            />
                        ) : null}
                    </div>
                </div>
            )}
        </PendantAutoFormat>
    );
};

// 外层组件，动态加载context
const Plane: React.FC = (): JSX.Element => (
    <PendantStageContext.Provider value={pendantStore}>
        <APendant />
    </PendantStageContext.Provider>
);

export default Plane;
