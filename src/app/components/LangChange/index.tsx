import React, { memo } from 'react';
import LangChangeIndex from 'elelive-ui/es/Components/LangChange';
import appStore from '@Stores/appStore';

import './index.scss';

export const LangChange = memo((props) => {
    const { language } = appStore.appSystemInfo;
    const chooseLang = (lang) => {
        console.log(lang);
        appStore?.updateAppSystemInfo({ language: lang });
    };
    return (
        <div className="LangChangeIndex-box">
            <div {...props}>
                <LangChangeIndex
                    defaultLang={language}
                    chooseLang={(lang) => chooseLang(lang)}
                >
                    语言切换
                </LangChangeIndex>
            </div>
        </div>
    );
});
