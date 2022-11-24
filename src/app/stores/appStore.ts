import queryString from 'query-string';
import { observable } from 'mobx';
import { isPlainObject } from '@Utils/index';
import api from '../lib/api';

type IParams = {
    url?: string;
    region?: string;
    anchorId?: string;
    anchor_id?: string;
    lang?: string;
    curTab?: string;
    selectTab?: string;
    regionType?: string;
    path: string;
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
type IAppHeaderInfo = {
    statusBarHeight: number; //状态栏高度
    titleBarHeight: number; //标题栏高度
    bottomBarHeight: number; //底部导航栏高度
};
export interface IStore {
    timestamp: number;
    setTimestamp: (data: number) => void;
    i18n: any;
    loading: boolean;
    appHeaderInfo: IAppHeaderInfo;
    params: IParams;
    auth: IAuth;
    server: IServer;
    listsStyles: IListsProps;
    appSystemInfo: IAppSystemInfo;
    anchorIdRegion: string | number | any;
    isLogin: boolean;
    setIsLogin: (value: boolean) => any;
    updateAuthInfo: (auth: Record<string, any>) => void;
    updateAppSystemInfo: (appSystemInfo: Record<string, any>) => void;
    updateAppUrl: (search: string) => void;
    updateServerConfig: (options: Record<string, any>) => void;
    updateListsStyles: (options: IListsProps) => void;
    setI18n: (data: any) => void;
    setLoading: (data: boolean) => void;
    setAppHeaderInfo: (data: IAppHeaderInfo) => void;
    getAnchorRegion: (data: any) => void;
}

const appStore = observable<IStore>({
    timestamp: 0,
    setTimestamp(data) {
        this.timestamp = data;
        return this;
    },
    i18n: {},
    setI18n(data) {
        this.i18n = data;
        return this;
    },

    loading: false,
    setLoading(state) {
        this.loading = state;
        return this;
    },
    isLogin: false,
    setIsLogin(value) {
        this.isLogin = value;
        return this;
    },

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
        lang: '',
        path: '',
        // curTab: '',
    }, // 从url中获取的所有参数

    auth: {
        Device: '',
        accessToken: '',
        deviceId: '',
        uid: '',
        AppVersion: '',
        region: '',
        nickName: '',
    },

    appSystemInfo: {
        language: '',
    },

    appHeaderInfo: {
        statusBarHeight: 0,
        titleBarHeight: 88,
        bottomBarHeight: 0,
    },

    anchorIdRegion: '',

    setAppHeaderInfo(data) {
        const tempData: any = { ...data };
        const queryOptions: Record<string, any> = queryString.parse(location.search);
        if (queryOptions?.anchorId) {
            tempData.statusBarHeight = 4;
        }
        this.appHeaderInfo = tempData;
        return this;
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

    updateServerConfig(options: any) {
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
            const obj: any = {};
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
            if (obj.lang) {
                Object.assign(this.appSystemInfo, {
                    language: obj.lang,
                });
            }
        }
        return this;
    },

    updateAppSystemInfo(appSystemInfo) {
        if (isPlainObject(appSystemInfo)) {
            const { language = 'en', themeName = 'light' } = appSystemInfo;
            Object.assign(this.appSystemInfo, {
                language,
            });
            document.documentElement.className = 'theme-' + themeName;
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

    getAnchorRegion(params) {
        api.getAnchorLiveRegion({ anchorId: params }).then((res) => {
            this.anchorIdRegion = res;
        });
        return this;
    },
});
export default appStore;
