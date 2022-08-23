import React, { useEffect } from 'react';

import EntryApp from './model/EntryApp';

import { AppContext } from './context';

import appStore from './stores/appStore';

import JSBridge from './utils/JSBridge';

import './scss/base.scss';

import './scss/index.scss';

// if (APP_ENV !== 'prod') {
//     // eslint-disable-next-line global-require
//     // const VConsole = require('vconsole');
//     // eslint-disable-next-line no-new
//     // new VConsole();
// }

interface IProps {
    children?: React.ReactNode;
}

interface IAppProps extends IProps {}

const App: React.FC<IAppProps> = (): JSX.Element => {
    /* 获取授权信息 */
    const updateAuthInfo = () => {
        JSBridge.GetAppUserInfo((res) => {
            console.log('Auth=======>', res);
            appStore.updateAuthInfo(res);
        });
    };

    /* 获取系统信息 */
    const updateAppSystemInfo = () => {
        JSBridge.GetAppSystemInfo((res) => {
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
        } else if (isAndroid) {
            document.body.classList.add('body-android');
        }
    };

    useEffect(() => {
        updateAuthInfo();
        updateAppSystemInfo();
        userAgentClass();
    }, []);

    return (
        <AppContext.Provider value={appStore}>
            <EntryApp />
        </AppContext.Provider>
    );
};

export default App;
