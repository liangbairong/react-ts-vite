import React, { useState } from 'react';
import Img from 'elelive-ui/es/Components/Img';
import Text from '@Components/Text';
import DowPage from './dowPage';
import { isWx } from '@Utils/index';

import './index.scss';
import { plusVersion } from '../../utils';

const Community = () => {
    const [dowPageStatus, setDowPageStatus] = useState(false);
    const [tips, setTips] = useState(false);
    const goToApp = () => {
        if (isWx()) {
            setTips(true);
            return;
        }
        // const url = 'elelive://home.elelive.tv?RedirectType=WEB_URL&isNeedLogin=true&RedirectContent=' + encodeURIComponent(window.location.href)

        const url = 'elelive://home.elelive.tv?RedirectType=WEB_URL&isNeedLogin=true';
        console.log(url);
        window.location.href = url;
        setDowPageStatus(true);
    };
    return (
        <div className='community'>
            <div className='com-header'>
                <Img src={plusVersion('/images/dow/logo.png')} className='com-header-img' />
                <div className='com-header-box'>
                    <div className='com-header-box-tit'>小象直播</div>
                    <p className='com-header-box-p'>华人直播交友平台</p>
                </div>
                <div className='com-header-btn' onClick={goToApp}>
                    <Text i18nKey='BindNow'>打开APP观看</Text>
                </div>
            </div>

            <div className='com-center'>
                <Img src={plusVersion('/images/dow/main.png')} className='com-center-img' />
                <div className='com-center-text'>来小象，浏览更多动态内容</div>
            </div>

            <div className='com-go-btn' onClick={goToApp}>
                打开APP查看详情
            </div>

            {tips && (
                <div
                    className='mask share-tips'
                    onClick={() => {
                        setTips(false);
                    }}>
                    <div className='tips-box'>
                        <p className='share-text'>
                            {' '}
                            <Text i18nKey='ChooseOpenBrowser'>选择在浏览器中打开</Text>
                        </p>
                    </div>
                </div>
            )}
            {dowPageStatus && <DowPage />}
        </div>
    );
};

export default Community;
