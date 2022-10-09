import { isIos } from '@Utils/index';
import React from 'react';
import './index.scss';

const DowPage = () => {
    const dow = () => {
        window.location.href = isIos() ? 'https://itunes.apple.com/us/app/id1237482267' : 'https://play.google.com/store/apps/details?id=com.yiwuzhibo';
    };
    return (
        <div className='pages page-download'>
            <div className='down-btn' onClick={dow}>
                Get The APP
            </div>
        </div>
    );
};

export default DowPage;
