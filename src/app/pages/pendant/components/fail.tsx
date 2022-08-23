import React, { FC } from 'react';
import { Text } from '@Components/Text';

const Fail: FC = (): JSX.Element => {
    return (
        <div className="fail-box">
            <div className="fail-explain">
                <p>
                    <Text i18nKey="TheVJIsNotYetOnTheList">主播暂未上榜</Text>
                </p>
                <p>
                    <Text i18nKey="ComeAndSendHimherEventGifts">快去送TA活动礼物吧</Text>
                </p>
            </div>
        </div>
    );
};

export default Fail;
