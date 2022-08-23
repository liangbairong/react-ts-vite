import React, { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import Img from 'elelive-ui/es/Components/Img';
import CountDown from 'elelive-ui/es/Components/CountDown';
import classNames from 'classnames';
import { filterParams } from '@Utils/index';
import JSBridge from '@Utils/JSBridge';
import { Progress, Text, FillText } from '@Components/index';
import '../index.scss';

type ILuckPendant = {
    infoData: any;
};
const Luck: FC<ILuckPendant> = observer(({ infoData }: ILuckPendant): JSX.Element => {
    const [isShow, setIsShow] = useState<boolean>(true);
    const [twinkle, setTwinkle] = useState<boolean>(false);
    const [currentRoundEndTime, setCurrentRoundEndTime] = useState<number>(0);
    const linkFn = (e) => {
        e.stopPropagation();
        // JSBridge.sensorsTrack('sweetGuardian', '直播间甜蜜任务挂件');
        const url = `${
            window.location.href.split('/room_pendant')[0]
        }/index?curTab=task&selectTab=confessionTime&${filterParams()}`;
        JSBridge.openWebView(url);
        console.log(url);
    };
    // 30s倒计时
    const FixedTimeCountDownEventHandle = () => {
        console.log('30s倒计时触发....', isShow, twinkle);
        setIsShow(true);
        setTwinkle(true);
    };
    const onHandCountDownEvent = () => {
        console.log('本轮倒计时结束', isShow);
        setCurrentRoundEndTime(0);
        setTwinkle(false);
    };
    useEffect(() => {
        // console.info('infoData--变化12323', infoData);
        if (infoData?.roundEndTime && infoData?.roundEndTime !== currentRoundEndTime) {
            setCurrentRoundEndTime(infoData?.roundEndTime);
            setTwinkle(false);
        }
    }, [infoData]);
    return (
        <div className="LuckPendant">
            <h2
                className="LuckPendant-title"
                onClick={() => {
                    setIsShow(!isShow);
                }}
            >
                <FillText i18nKey="Momentforloveandexpression" options={{ value: 0 }} minSize={13}>
                    告白时刻
                </FillText>
                <Img
                    src={new URL('@Assets/images/pendant/room/xjt.png',import.meta.url).href}
                    className={classNames(
                        'LuckPendant-title-img',
                        isShow ? 'LuckPendant-title-img-action' : ''
                    )}
                />
            </h2>
            <div hidden={!isShow} className="luckPendant-content-box">
                <div className="LuckPendant-content" onClick={linkFn}>
                    <div
                        className={classNames('LuckPendant-content-animation', {
                            twinkle,
                        })}
                    />
                    <div className="LuckPendant-content-box">
                        <div className="LuckPendant-content-box-current-level">
                            <Text i18nKey="Fancyblindboxgift">盲盒高级礼物</Text>
                            <span> </span>
                            <span className="intl-active">
                                <Text i18nKey="Doubletheprobability">概率翻倍</Text>
                            </span>
                        </div>
                        <div className="LuckPendant-content-box-next-level">
                            <FillText
                                i18nKey="Tocompletethetime-limitingtask"
                                options={{ value: 0 }}
                                minSize={13}
                            >
                                完成限时任务还需获得
                            </FillText>
                        </div>
                        <div className="LuckPendant-content-progress">
                            <Progress
                                all={infoData?.totalIntegral} // 总数
                                have={Number(infoData?.perIntegral)} // 已完成
                            >
                                <Text
                                    i18nKey="numberblindboxes"
                                    options={{
                                        value:
                                            Number(infoData?.totalIntegral) -
                                            Number(infoData?.perIntegral),
                                    }}
                                >
                                    x 个
                                </Text>
                            </Progress>
                            {/* {infoData?.num > 0 && (
                                <p className="LuckPendant-content-box-round">
                                    <Text i18nKey="GotRewards" options={{ value: infoData?.num }}>
                                        已获得xx奖励
                                    </Text>
                                </p>
                            )} */}
                        </div>

                        <div
                            className="LuckPendant-content-complete"
                            style={{
                                opacity: infoData?.awardsCount && infoData.awardsCount > 0 ? 1 : 0,
                            }}
                        >
                            <Text
                                i18nKey="Completedtimes"
                                options={{ value: Number(infoData?.awardsCount || 0) }}
                            >
                                已完成x次
                            </Text>
                        </div>

                        <div className="luck-endTime">
                            <Text i18nKey="ToTheEndOfThisRound">距本轮结束</Text>
                            <span className="livePendant-time-value">
                                {currentRoundEndTime ? (
                                    <CountDown
                                        key={currentRoundEndTime}
                                        ROOT_BASE={ROOT_BASE}
                                        endTime={currentRoundEndTime}
                                        timeFormat="mm:ss"
                                        fixedTime={30000}
                                        onFixedTimeCountDownEvent={FixedTimeCountDownEventHandle}
                                        onHandCountDownEvent={onHandCountDownEvent}
                                    />
                                ) : (
                                    '00:00'
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Luck;
