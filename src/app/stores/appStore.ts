import queryString from 'query-string';
import { observable } from 'mobx';
import { isPlainObject } from '@Utils/index';

type IParams = {
    url?: string;
    region?: string;
    anchorId?: string;
    lang?: string;
    curTab?: string;
    selectTab?: string;
};

type IAuth = {
    Device: string;
    accessToken: string;
    deviceId: string;
    uid: string;
    AppVersion: string;
    region: string;
    nickName?: string;
};

type IServer = {
    timestamp: number;
};

type IAppSystemInfo = {
    language: string;
};

type IListsProps = {
    anchor?: string | number;
    user?: string | number;
};

export interface IStore {
    noneImage: string;
    params: IParams;
    auth: IAuth;
    server: IServer;
    listsStyles: IListsProps;
    appSystemInfo: IAppSystemInfo;
    updateAuthInfo: (auth: Record<string, any>) => void;
    updateAppSystemInfo: (appSystemInfo: Record<string, any>) => void;
    updateAppUrl: (search: string) => void;
    updateServerConfig: (options: Record<string, any>) => void;
    updateListsStyles: (options: IListsProps) => void;
}

const appStore = observable<IStore>({
    noneImage: new URL('@Assets/images/common/logo.png',import.meta.url).href,

    server: {
        timestamp: Date.now(), // 服务器timestamp
    },

    listsStyles: {
        anchor: 30,
        user: 30,
    },

    params: {
        // region: '',
        // anchorId: '',
        // lang: '',
        // curTab: '',
    }, // 从url中获取的所有参数

    auth: {
        Device: '',
        accessToken: '',
        deviceId: '',
        uid: '',
        AppVersion: '',
        region: 'XM',
        nickName: '',
    },

    // auth: {
    //     Device: 'IOS',
    //     accessToken: '7c06f86b22ec434eba5e2f6ce7efb778',
    //     deviceId: '0F2EF816912A4E88A19405CFB12AA458',
    //     uid: 'Test00011163',
    //     AppVersion: '4.34.0',
    //     region: 'XM',
    //     nickName: 'LittleLoon',
    //     // avatar: 'https://showme-livecdn.elelive.net/static/avatar.png?r=1',
    // },

    appSystemInfo: {
        language: '',
    },

    updateAuthInfo(auth) {
        if (isPlainObject(auth)) {
            const { appVersion, device, deviceId, token, userId, region, nickName } = auth;
            Object.assign(this.auth, {
                Device: device,
                accessToken: token,
                uid: userId,
                AppVersion: appVersion,
                deviceId,
                region,
                nickName,
            });
        }
        return this;
    },

    updateServerConfig(options) {
        if (isPlainObject(options)) {
            Object.assign(this.server, options);
        } else {
            this.server = options;
        }
        return this;
    },

    // 获取url中的参数
    updateAppUrl(search) {
        // const search_str = window.decodeURIComponent(search);
        const queryOptions: Record<string, any> = queryString.parse(search);

        if (isPlainObject(queryOptions)) {
            const obj = {};
            /* 避免因为url重复导致的参数错误问题 */
            Object.keys(queryOptions).forEach((item) => {
                if (Array.isArray(queryOptions[item])) {
                    // eslint-disable-next-line prefer-destructuring
                    obj[item] = queryOptions[item][0];
                } else {
                    obj[item] = queryOptions[item];
                }
            });

            console.log('入口参数=======>', obj);

            Object.assign(this.params, obj);

            /* 如果jsBridge拿不到区域，直接从url中拿 */
            if (!this.auth.region) {
                Object.assign(this.auth, {
                    region: queryOptions.region,
                });
            }
        }
        return this;
    },

    updateAppSystemInfo(appSystemInfo) {
        if (isPlainObject(appSystemInfo)) {
            const { language = 'en' } = appSystemInfo;
            Object.assign(this.appSystemInfo, {
                language,
            });
            console.log(appSystemInfo, 'jsbridge返回参数appSystemInfo');
        }
        return this;
    },

    updateListsStyles(value) {
        if (isPlainObject(value)) {
            Object.assign(this.listsStyles, value);
        }
        return this;
    },
});
export default appStore;
