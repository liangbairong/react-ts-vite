import React from 'react';

import Header from '@Components/Header';
import { DropBoxProps } from '@Components/DropBox';

import './index.scss';
import classNames from 'classnames';

export type IAppLoayoutProps = {
    showHome?: boolean;
    countryName?: string;
    customizeClassName?: string;
    headerImage?: React.ReactNode | Record<string, any>;
    headerChildren?: React.ReactNode;
    children?: React.ReactNode;
} & DropBoxProps;

const AppLayoutPage: React.FC<IAppLoayoutProps> = ({ customizeClassName, showHome, countryName, headerImage, headerChildren, children, text, onClickHandle, list }) => {
    return (
        <div className={classNames('app-layout', customizeClassName)}>
            <Header showHome={showHome} countryName={countryName} headerImage={headerImage} text={text} onClickHandle={onClickHandle} list={list}>
                {headerChildren}
            </Header>
            <div className='page-wrap'>{children}</div>
        </div>
    );
};

export default React.memo(AppLayoutPage);
