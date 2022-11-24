import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';
import Text from '../Text';
interface IPrize<T = any> {
    data: T;
    className?: string;
}
const Prize = ({ data, className = '' }: IPrize) => {
    return (
        <div className={classNames('Prize', className)}>
            <div className='Prize-img-box'>
                <Img src={data.picUrl} className='Prize-img' />
                <div className='Prize-selectState'>x{data.quantity}</div>
            </div>
            <div className='Prize-name'>{data.giftName}</div>
            <p className='Prize-prize'>
                <Text i18nKey='ValueElecoin' className='Prize-prize-text' options={{ value: data.prize }}>
                    总价值xx小象币
                </Text>
            </p>
            {data.isSpcePrize === 1 && (
                <div className='Prize-out-prize'>
                    <Text i18nKey='TeamwinningRewardsForYou'>支持球队获胜额外奖励</Text>
                </div>
            )}
        </div>
    );
};

export default Prize;
