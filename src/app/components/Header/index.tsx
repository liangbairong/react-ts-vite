import React, { FC, useEffect, useState } from 'react';
import Img from 'elelive-ui/es/Components/Img';
import JSBridge from '@Utils/JSBridge';
import appStore from '../../stores/appStore';
import classNames from 'classnames';
import './index.scss';
import { plusVersion, pxToVw } from '../../utils';

interface IHeader {
    title: React.ReactNode | string;
    className?: string;
}

const Header: FC<IHeader> = ({ title = '', className = '' }: IHeader): JSX.Element => {
    const {
        appHeaderInfo: { statusBarHeight, titleBarHeight },
    } = appStore;
    return (
        <>
            <div
                className={classNames('header', className)}
                style={{
                    paddingTop: `${pxToVw(statusBarHeight)}px`,
                    height: `${pxToVw(titleBarHeight)}px`,
                }}>
                <Img
                    src={plusVersion('/images/back.png')}
                    className='back'
                    // style={{bottom:`${pxToVw(titleBarHeight/2)}px`}}
                    onClick={() => {
                        JSBridge.appCloseWeb();
                    }}
                />
                {title}
            </div>
            <div
                style={{
                    height: `${pxToVw(statusBarHeight + titleBarHeight)}px`,
                }}
            />
        </>
    );
};

export default Header;
