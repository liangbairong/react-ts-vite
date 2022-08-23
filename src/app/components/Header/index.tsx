import React, { FC, useState, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import appStore from '@Stores/appStore';
import Img from 'elelive-ui/es/Components/Img';
import { Text } from '../Text/index';
import {getImgUrl} from '@Utils/index'

import './index.scss';
type IProps = {
    headerImage?: JSX.Element;
    children?: React.ReactNode;
    showHome?: boolean;
};
const LoadHeaderImage = () => {
    // const appStore = useStore();
    const { pathname } = useLocation();
    const { language } = appStore.appSystemInfo;
    const { lang: langParams } = appStore.params;
    // 国际化名称
    const languageArg = language || langParams || 'zh-CN';
    const countryName = languageArg.replace('zh-', '').toUpperCase();
    /*  图片文件夹必须和路由名一致 */
    const imagePath = pathname === '/' ? '/index' : pathname;
    // eslint-disable-next-line import/no-dynamic-require
    // const imgResPath = require(`../../../assets/images${imagePath}/header_${countryName}.png`);
    return <img src={getImgUrl('/images/pendant/room/top-bg.png')}/>
    return <Img className="header-image"    src={{
        'zh-CN': new URL('../../../assets/images/pendant/room/top-bg.png',import.meta.url).href,
        'zh-TW': new URL('../../../assets/images/pendant/room/top-bg-tw.png',import.meta.url).href,
        en: new URL('../../../assets/images/pendant/room/top-bg-en.png',import.meta.url).href,
        id: new URL('../../../assets/images/pendant/room/top-bg-id.png',import.meta.url).href,
        vi: new URL('../../../assets/images/pendant/room/top-bg-vi.png',import.meta.url).href,
    }} alt="" />;
};

export const Header: FC<IProps> = memo(
    ({ children, showHome = true, headerImage }: IProps): JSX.Element => {
        const history = useHistory();
        const location = useLocation();
        const { search } = location;
        const handleGoHome = () => {
            history.push(`/${search}`);
        };
        return (
            <header className="header">
                {/* 这里是自定义的header部分 */}
                <div className="header-btn-group">
                    <div className="header-menu-left">
                        {children}
                        {showHome && (
                            <div
                                className="header-menu-item header-goHome"
                                aria-controls="home-menu"
                                aria-haspopup="true"
                                onClick={() => handleGoHome()}
                            >
                                <span>
                                    <Text i18nKey="HomePage" options={{}}>
                                        主页
                                    </Text>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {/* 头部标题图片 */}
                <div className={classNames('header-image-box')}>
                    {headerImage || <LoadHeaderImage />}
                    <div className="header-time" />
                </div>
            </header>
        );
    }
);
