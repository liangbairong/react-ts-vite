import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import intl from 'react-intl-universal';
import {observer} from 'mobx-react-lite';
import {AppContext} from '../context';
import {useStore} from '../hooks';
import {IStore} from '../stores/appStore';
import Routes from './Routes';
import ErrorBoundary from './Error';
import queryString from "query-string";

interface ILocales {
    [keyName: string]: string
}

const locales: ILocales = {
    'zh-CN': 'zh_cn',
    'zh-TW': 'zh_tw',
    en: 'en_us',
    vi: 'vi_vi',
    id: 'id_id',
};

type I18nEntryProps = {
    children: JSX.Element[] | JSX.Element;
};

const I18nEntry = observer((props: I18nEntryProps): JSX.Element => {
    const {children} = props;

    const appStore = useStore<IStore>(AppContext);

    const {language} = appStore.appSystemInfo;
    const queryOptions: Record<string, any> = queryString.parse(window.location.search);
    const currentLocale = language || queryOptions.lang || 'zh-CN';
    console.log(currentLocale)
    const [initDone, setInitDone] = useState(false);

    useEffect(() => {
        setInitDone(false);

        const url = '/i18n/' + locales[currentLocale] + '/index.json?v='+import.meta.env.VITE_VERSION
        const XhrObj = new XMLHttpRequest();
        XhrObj.open("get", url, false);
        XhrObj.onreadystatechange = function () {
            if (XhrObj.status == 200) {
                const json = JSON.parse(XhrObj.responseText);
                console.log('国际化');
                console.log(json)
                intl.init({
                    currentLocale,
                    locales: {
                        [currentLocale]: json,
                    },
                }).then(() => {
                    setTimeout(() => {
                        setInitDone(true);
                    }, 0);
                });
            } else {
                console.log('获取国际化失败')
            }
        }
        XhrObj.send(null);

    }, [currentLocale]);

    return <>{initDone && children}</>;
});

const EntryApp = (): JSX.Element => (
    <BrowserRouter>
        <I18nEntry>
            <ErrorBoundary>
                <Routes/>
            </ErrorBoundary>
        </I18nEntry>
    </BrowserRouter>
);

export default EntryApp;
