import React, { useEffect } from 'react';
import EntryApp from './model/EntryApp';
import { AppContext, EventEmitterContext } from './context';
import appStore from '@Stores/appStore';
import eventEmitterStore from '@Stores/eventEmitterStore';
import JSBridge from './utils/JSBridge';
import './scss/base.scss';
import './scss/index.scss';

interface IProps {
    children?: React.ReactNode;
}

type IAppProps = IProps;

const App: React.FC<IAppProps> = (): JSX.Element => {
    /* 获取授权信息 */
    const updateAuthInfo = () => {
        JSBridge.GetAppUserInfo((res: any) => {
            console.log('GetAppUserInfo=======>');
            console.log(res);
            appStore.updateAuthInfo(res);
        });
    };

    /* 获取系统信息 */
    const updateAppSystemInfo = () => {
        JSBridge.GetAppSystemInfo((res: any) => {
            console.log('触发jsbridge事件-GetAppSystemInfo', res);
            appStore.updateAppSystemInfo(res);
        });
    };

    const userAgentClass = () => {
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        if (isiOS) {
            document.body.classList.add('body-ios');
            sessionStorage.setItem('mobilePlatform', 'ios');
        } else if (isAndroid) {
            document.body.classList.add('body-android');
            sessionStorage.setItem('mobilePlatform', 'android');
        }
    };

    useEffect(() => {
        appStore.updateAppUrl(location.search);

        // 获取系统高度
        JSBridge.getAppHeaderInfo((data: string) => {
            console.log('---getAppHeaderInfo---');
            console.log(data);
            appStore.setAppHeaderInfo(JSON.parse(data));
        });

        updateAuthInfo();
        updateAppSystemInfo();
        userAgentClass();
    }, []);

    return (
        <AppContext.Provider value={appStore}>
            <EventEmitterContext.Provider value={eventEmitterStore}>
                <EntryApp />
            </EventEmitterContext.Provider>
        </AppContext.Provider>
    );
};

export default App;
