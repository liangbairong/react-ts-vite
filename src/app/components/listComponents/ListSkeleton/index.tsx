import React, { FC, useEffect, useState } from 'react';
import Skeleton from 'elelive-ui/es/Components/Skeleton';
import './index.scss';

const CustomSkeleton = ({ ...props }: any): JSX.Element => {
    return <Skeleton {...props} color='#7f43c3' highlightColor='#8a59ca' />;
};

// 骨架屏
type IListSkeleton = {
    SkeletonNmu?: number;
    ShowTab?: boolean;
};

const ListSkeleton = ({ SkeletonNmu = 10, ShowTab = true }: IListSkeleton) => (
    <div className='ListSkeleton-box'>
        <div className='lists-bg'>
            {ShowTab && (
                <div className='date-ul'>
                    <CustomSkeleton height='8vw' />
                </div>
            )}
            <div className='list-header'>
                <div className='header-info'>
                    <CustomSkeleton height='5vw' width='10vw' />
                </div>
                <div className='refresh-btn'>
                    <CustomSkeleton height='5vw' width='5vw' />
                </div>
            </div>
            <div className='lists-title'>
                <div className='lists-title-rank'>
                    <CustomSkeleton height='5vw' width='8vw' />
                </div>
                <div className='lists-title-name'>
                    <CustomSkeleton height='5vw' width='12vw' />
                </div>
                <div className='lists-title-integral'>
                    <CustomSkeleton height='5vw' width='8vw' />
                </div>
            </div>
            {new Array(SkeletonNmu).fill('').map((item, index) => (
                <div key={item + index} className='lists-item'>
                    <div className='lists-item-rank'>
                        <CustomSkeleton height='3vw' width='5vw' />
                    </div>
                    <div className='lists-item-info'>
                        <div className='lists-info-img'>
                            <CustomSkeleton height='7vw' width='7vw' circle />
                        </div>
                        <div className='lists-info-name'>
                            <CustomSkeleton height='4vw' width='10vw' />
                        </div>
                    </div>
                    <div className='lists-item-integral'>
                        <CustomSkeleton height='3vw' width='8vw' />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ListSkeleton;
