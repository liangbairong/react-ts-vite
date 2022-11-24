import Toast from 'elelive-ui/es/Components/Toast';
import appStore from '../stores/appStore';
import queryString from 'query-string';

export interface IHttp {
    url: string | null;
    data?: any;
    method?: string;
    baseUrl?: string;
    noErrorToast?: boolean;
    dataType?: string;
    returnType?: 'All' | 'Data' | string;
    key?: string | null;
}

export interface IResponse<T = any> {
    data: T;
    msg: string;
    status: number;
    timestamp: number;
    traceId: string;
}

const makeHeader = () => {
    const { language } = appStore.appSystemInfo;
    const { AppVersion, accessToken } = appStore.auth;
    const { regionType } = appStore.params;
    // @ts-ignore
    const region = regionType || appStore.auth?.region || appStore.params?.region;
    if (!accessToken) {
        return { AppVersion, region, 'Accept-Language': language || 'zh-CN' };
    }
    const { nickName, ...resp } = appStore.auth;
    return Object.assign({ ...resp }, { 'Accept-Language': language || 'en', region });
};

export const http = <R = any>(options: IHttp): Promise<R> => {
    const method = options.method || 'get';
    const baseUrl = options.baseUrl || window.HTTP_BASE;
    const returnType = options.returnType || 'Data';
    let url: string = options.url || '';
    let params: any = {
        body: JSON.stringify(options.data),
    };
    if (method === 'get') {
        const stringData = queryString.stringify(options.data);
        url = url + (stringData ? `?${stringData}` : '');
        params = {};
    }

    return fetch(baseUrl + url, {
        method,
        headers: Object.assign(
            {
                'Content-Type': 'application/json',
            },
            makeHeader(),
        ),
        ...params,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status !== 200 && !options.noErrorToast) {
                Toast.open({
                    content: data.msg,
                });
            }
            if (options.dataType === 'root') {
                return data;
            }
            if (data.timestamp) {
                appStore.setTimestamp(data.timestamp);
            }
            if (returnType === 'Data') return data.data;
            if (returnType === 'All') return data;
            return data.data;
        })
        .finally(() => {
            appStore.setLoading(false);
        });
};
