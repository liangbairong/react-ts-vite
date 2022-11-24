import React, { FC, memo, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';

import { LangChange } from '@Components/LangChange';
import Text from '@Components/Text';
import DropBox, { DropBoxProps } from '@Components/DropBox';

import appStore from '../../stores/appStore';
import QuizRecordDialog from '../QuizRecordDialog';
import { plusVersion } from '../../utils';
import './index.scss';

type IProps = {
    children?: React.ReactNode;
    showHome?: boolean;
    countryName?: string;
    headerImage?: any;
} & DropBoxProps;

const TextHeaderImage = ({ headerImage }: { headerImage: any }) => {
    const { language } = appStore.appSystemInfo;
    const { lang: langParams } = appStore.params;
    // 国际化名称
    const languageArg = language || langParams || 'zh-CN';
    return <Img className={classNames('header-image', languageArg)} language={languageArg} src={{ ...headerImage }} alt='' />;
};
const Header: FC<IProps> = memo(
    ({
        showHome = true,
        countryName = 'XM',
        headerImage = {
            'zh-CN': plusVersion('/images/index/header_text_CN.png'),
            'zh-TW': plusVersion('/images/index/header_text_TW.png'),
            en: plusVersion('/images/index/header_text_EN.png'),
            vi: plusVersion('/images/index/header_text_EN.png'),
            id: plusVersion('/images/index/header_text_EN.png'),
            ms: plusVersion('/images/index/header_text_EN.png'),
        },
        children,
        text = <Text i18nKey='more'>更多</Text>,
        list,
        onClickHandle,
    }: IProps): JSX.Element => {
        const navigate = useNavigate();
        const location = useLocation();
        const { search } = location;

        const handleGoHome = () => {
            navigate(`/${search}`, { replace: false });
        };

        const goToIntrPage = () => {
            navigate(`/webview?url=${encodeURIComponent(`https://showme-h5.oss-accelerate.aliyuncs.com/activity/product-items/2022Year/November/worldCup/index.html?`)}`);
        };

        const listFuncArr = useMemo(() => {
            if (list) {
                return [
                    ...list,
                    {
                        name: <Text i18nKey='ActivityIntroduction'>活动介绍</Text>,
                        clickFunc: goToIntrPage,
                    },
                ];
            }
            return [
                {
                    name: <Text i18nKey='ActivityIntroduction'>活动介绍</Text>,
                    clickFunc: goToIntrPage,
                },
            ];
        }, [list]);

        return (
            <>
                <header className='header'>
                    {import.meta.env.MODE !== 'production' && <LangChange />}
                    <div className='header-logo'>
                        <Img className='header-logo-elelive' src={plusVersion('/images/common/header-logo.png')} />
                    </div>
                    {/* 这里是自定义的header部分 */}
                    <div className='header-btn-group'>
                        {showHome && (
                            <div className='header-menu-left'>
                                <div className='header-menu-item more-list' aria-controls='home-menu' aria-haspopup='true'>
                                    <DropBox text={text} onClickHandle={onClickHandle} list={listFuncArr} />
                                </div>
                                <div className='header-menu-item header-goHome' aria-controls='home-menu' aria-haspopup='true' onClick={() => handleGoHome()}>
                                    <span>
                                        <Text i18nKey='HomePage'>主页</Text>
                                    </span>
                                </div>
                            </div>
                        )}
                        {children && <div className='header-menu-left'>{children}</div>}
                    </div>
                    {/* 头部标题图片 */}
                    <div className={classNames('header-image-box')}>
                        <TextHeaderImage headerImage={headerImage} />
                    </div>
                </header>
            </>
        );
    },
);

export default Header;
