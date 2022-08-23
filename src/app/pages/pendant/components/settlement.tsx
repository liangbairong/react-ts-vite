import React, { useEffect, useState } from 'react';

import { Text } from '@Components/Text';

import CountDown from 'elelive-ui/es/Components/CountDown';

import { ISigUp } from '../type';

import '../index.scss';

// 结算中
const Settlement: React.FC<ISigUp> = ({ info, onRefresh }: ISigUp): JSX.Element => {
    const [settleTimeNum, setSettleTimeNum] = useState<number>(0);
    const onHandCountDownEvent = () => {
        setSettleTimeNum(0);
        onRefresh();
    };
    console.log('Settlement-info', info);
    useEffect(() => {
        if (info?.settleEndTime && info?.settleEndTime !== settleTimeNum) {
            setSettleTimeNum(info?.settleEndTime);
        }
    }, [info]);
    return (
        <div className="livePendant-zsz">
            <p>
                <Text i18nKey="rankingBeingSettled">榜单结算中</Text>
            </p>
            <div>
                {settleTimeNum !== 0 ? (
                    <CountDown
                        key={settleTimeNum}
                        ROOT_BASE={ROOT_BASE}
                        endTime={settleTimeNum}
                        timeFormat="ss"
                        onHandCountDownEvent={onHandCountDownEvent}
                    />
                ) : (
                    '0'
                )}
                <span className="livePendant-s">s</span>
            </div>
        </div>
    );
};

export default Settlement;
