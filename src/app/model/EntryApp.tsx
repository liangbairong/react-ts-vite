import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loading from 'elelive-ui/es/Components/Loading';
import { observer } from 'mobx-react-lite';
import appStore from '../stores/appStore';
import Routes from './Routes';
import ErrorBoundary from './Error';
import queryString from 'query-string';
import reactI18n from 'min-react-i18n';

interface ILocales {
    [keyName: string]: string;
}

const locales: ILocales = {
    'zh-CN': 'zh_cn',
    'zh-TW': 'zh_tw',
    en: 'en_us',
    vi: 'vi_vi',
    id: 'id_id',
    ms: 'ms_ms',
};

type I18nEntryProps = {
    children: JSX.Element[] | JSX.Element;
};

const I18nEntry = observer((props: I18nEntryProps): JSX.Element => {
    const { children } = props;
    const { loading } = appStore;
    const { language } = appStore.appSystemInfo;
    const queryOptions: Record<string, any> = queryString.parse(window.location.search);
    const currentLocale = language || queryOptions.lang || 'zh-CN';
    console.log(currentLocale);
    const [initDone, setInitDone] = useState(false);

    const hideInitLoading = () => {
        if (window.ROOT_BASE && window.i18n) {
            const dom: any = document.querySelector('.loading-box');
            dom && dom.remove();
        }
    };

    useEffect(() => {
        fetch('/env.json')
            .then((response) => response.json())
            .then((data) => {
                window.ROOT_BASE = data['X_ROOT_BASE'];
                window.HTTP_BASE = data['X_HTTP_BASE'];
                hideInitLoading();
            });
    }, []);

    useEffect(() => {
        setInitDone(false);
        const url = '/i18n/' + locales[currentLocale] + '/index.json?v=' + import.meta.env.VITE_VERSION;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log('国际化');
                console.log(json);
                window.i18n = json;
                appStore.setI18n(json);
                reactI18n.init(json);
                setTimeout(() => {
                    setInitDone(true);
                }, 0);
                hideInitLoading();
            });
    }, [currentLocale]);

    return (
        <>
            {initDone && children} <Loading open={loading} fullScreen />
        </>
    );
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
