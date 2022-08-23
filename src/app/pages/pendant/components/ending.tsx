import React, { useEffect, useState } from 'react';

import { Text } from '@Components/Text';
import CountDown from 'elelive-ui/es/Components/CountDown';

import { ISigUp } from '../type';

import '../index.scss';

// 结束阶段
const Ending: React.FC<ISigUp> = ({ info, onRefresh }: ISigUp): JSX.Element => {
    const [dayEndTime, setDayEndTime] = useState<number>(0);
    useEffect(() => {
        if (info?.rankDTO?.roundEndTime && dayEndTime !== info?.rankDTO?.roundEndTime) {
            console.log('info?.rankDTO?.roundEndTime:', info?.rankDTO?.roundEndTime);
            setDayEndTime(info?.rankDTO?.roundEndTime);
        }
    }, [info]);

    const onHandCountDownEvent = () => {
        console.log('倒计时结束...');
        setDayEndTime(0);
        onRefresh();
    };
    if (info?.state === 10) {
        return (
            <div className="livePendant-time">
                <Text i18nKey="Theactivityhasended">活动已结束</Text>
            </div>
        );
    }
    if (info?.state === 1) {
        return (
            <div className="livePendant-time">
                <div>
                    <Text i18nKey="Totheendoftheday">距今日结束</Text>
                    <span className="livePendant-time-value">
                        {dayEndTime ? (
                            <CountDown
                                key={dayEndTime}
                                ROOT_BASE={ROOT_BASE}
                                endTime={dayEndTime}
                                onHandCountDownEvent={onHandCountDownEvent}
                            />
                        ) : (
                            '00:00:00'
                        )}
                    </span>
                </div>
            </div>
        );
    }
    return <div />;
};

export default Ending;
