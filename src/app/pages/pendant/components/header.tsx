import React, { FC, useEffect, useState } from 'react';

import CountDown from 'elelive-ui/es/Components/CountDown';

import { Text } from '@Components/Text';
import { formatNum1 } from '@Utils/index';
import intl from 'react-intl-universal';
import { IChildren, IGroupBox, IRanking } from '../type';

const RankBox: FC<IRanking> = ({ rank = '' }: IRanking): JSX.Element => {
    if (!rank) {
        return <span>NO.-</span>;
    }
    if (rank > 99) {
        return <span>NO.99+</span>;
    }
    if (rank > 0) {
        return <span>NO.{rank}</span>;
    }
    return <span />;
};

const Header: FC<IChildren> = ({ info = {} }: IChildren): JSX.Element => {
    const [additionEndTimeInfo, setAdditionEndTimeInfo] = useState<number>(0);
    const onHandCountDownEvent = () => {
        console.log('加成倒计时结束', additionEndTimeInfo);
        setAdditionEndTimeInfo(0);
    };
    useEffect(() => {
        if (
            info?.rankDTO?.additionEndTime &&
            info?.rankDTO?.additionEndTime !== additionEndTimeInfo
        ) {
            setAdditionEndTimeInfo(info?.rankDTO?.additionEndTime);
        }
    }, [info]);
    if (info?.state === 5) {
        return <div />;
    }
    return (
        <>
            <div className="livePendant-group">
                <Text i18nKey="HeartbeatDailylist">心动日榜</Text>
            </div>
            <div className="livePendant-no">
                <RankBox rank={info?.rankDTO?.rank} />
            </div>
            <div className="livePendant-txz">
                <div className="txz-title">
                    <Text i18nKey="Heartbeatvalue">心动值</Text>
                </div>
                {info?.state === 1 && info?.rankDTO?.addition >= 1 && additionEndTimeInfo !== 0 && (
                    <div className="Addition-box">
                        <Text
                            i18nKey="valueTimesAdding"
                            options={{ value: info?.rankDTO?.addition }}
                        >
                            xx倍加成中
                        </Text>
                        (
                        <CountDown
                            key={additionEndTimeInfo}
                            ROOT_BASE={ROOT_BASE}
                            endTime={additionEndTimeInfo}
                            timeFormat="mm:ss"
                            onHandCountDownEvent={onHandCountDownEvent}
                        />
                        )
                    </div>
                )}

                <p>{info?.rankDTO?.value > 0 ? formatNum1(info?.rankDTO?.value) : '-'}</p>
            </div>
        </>
    );
};

export default Header;
