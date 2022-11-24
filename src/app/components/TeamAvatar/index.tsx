import React, { FC, useEffect, useState } from 'react';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';

interface IBetBox<T = any> {
    data: T;
}
const TeamAvatar = ({ data }: IBetBox) => {
    return (
        <div className='TeamAvatar'>
            <div className='TeamAvatar-img'>
                <Img src={data?.icon} webp={false} className='TeamAvatar-img-con' />
            </div>
            <div className='TeamAvatar-name'>{data?.name}</div>
        </div>
    );
};

export default TeamAvatar;
