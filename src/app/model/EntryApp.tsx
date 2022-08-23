import React, { useEffect, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';

import intl from 'react-intl-universal';

import { observer } from 'mobx-react-lite';

import { AppContext } from '../context';

import { useStore } from '../hooks';

import { IStore } from '../stores/appStore';

import Routes from './Routes';
// import PendantRoutes from './PendantRoutes';

import ErrorBoundary from './Error';

import EN from '@Assets/i18n/en_us/index.json'
import CN from '@Assets/i18n/zh_cn/index.json'
import VI from '@Assets/i18n/vi_vi/index.json'
import TW from '@Assets/i18n/zh_tw/index.json'
import ID from '@Assets/i18n/id_id/index.json'

// app locale data
const locales = {
    'zh-CN': CN,
    'zh-TW': TW,
    en: EN,
    vi: VI,
    id: ID,
};

type I18nEntryProps = {
    children: JSX.Element[] | JSX.Element;
};

const I18nEntry = observer((props: I18nEntryProps): JSX.Element => {
    const { children } = props;

    const appStore = useStore<IStore>(AppContext);

    const { language } = appStore.appSystemInfo;

    const currentLocale = language || 'zh-CN';

    const [initDone, setInitDone] = useState(false);

    useEffect(() => {
        setInitDone(false);
        intl.init({
            currentLocale, // TODO: determine locale here
            locales,
        }).then(() => {
            setTimeout(() => {
                setInitDone(true);
            }, 0);
        });
    }, [currentLocale]);

    return <>{initDone && children}</>;
});

const EntryApp = (): JSX.Element => (
    <BrowserRouter>
        <I18nEntry>
            <ErrorBoundary>
                <Routes />
            </ErrorBoundary>
        </I18nEntry>
    </BrowserRouter>
);

export default EntryApp;
