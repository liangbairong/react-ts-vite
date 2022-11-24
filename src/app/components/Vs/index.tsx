import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';
import Text from '../Text';
interface IVs {
    data: any;
    className?: string;
}
const Vs = ({ data, className = '' }: IVs) => {
    return (
        <div className={classNames('vs', className)}>
            <div className={classNames('vs-li', data?.status ? 'vs-li-action' : '')}>
                <div className='vs-img-box'>
                    <div className='vs-img'>
                        <Img src={data?.teamA?.icon} webp={false} className='vs-img-con' />
                    </div>

                    {data?.teamA?.selectState === 1 && (
                        <div className='vs-selectState'>
                            <Text i18nKey='VJSupport'>主播支持</Text>
                        </div>
                    )}
                </div>
                <div className='vs-name'>{data?.teamA?.teamName || data?.teamA?.name}</div>
            </div>
            {data?.teamA?.score?.toString() ? (
                <div className='vs-li-score'>
                    {data?.teamA?.score} : {data?.teamB?.score}
                </div>
            ) : (
                <div className='vs-li-vs'>vs</div>
            )}

            <div className={classNames('vs-li', data?.status ? 'vs-li-action' : '')}>
                <div className='vs-img-box'>
                    <div className='vs-img'>
                        <Img src={data?.teamB?.icon} webp={false} className='vs-img-con' />
                    </div>
                    {data?.teamB?.selectState === 1 && (
                        <div className='vs-selectState'>
                            <Text i18nKey='VJSupport'>主播支持</Text>
                        </div>
                    )}
                </div>
                <div className='vs-name'>{data?.teamB?.teamName || data?.teamB?.name}</div>
            </div>
        </div>
    );
};

export default Vs;
