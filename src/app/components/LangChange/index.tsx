import React from 'react';
import { observer } from 'mobx-react-lite';
import LangChangeIndex from 'elelive-ui/es/Components/LangChange';
import appStore from '@Stores/appStore';

import './index.scss';

export const LangChange = observer(() => {
    const { language } = appStore.appSystemInfo;

    const chooseLang = (lang: any) => {
        console.log(lang);
        appStore.updateAppSystemInfo({ language: lang });
    };

    return (
        <div className='LangChangeIndex-box'>
            <LangChangeIndex defaultLang={language} chooseLang={(lang: any) => chooseLang(lang)}>
                语言切换
            </LangChangeIndex>
        </div>
    );
});
