import useSWR from 'swr';
import Toast from 'elelive-ui/es/Components/Toast';
import appStore from '../stores/appStore';
import queryString from 'query-string';
// import axios from 'axios';

interface IHttp {
    url: string | null;
    data?: any;
    method?: string;
    baseUrl?: string;
    noErrorToast?: boolean;
    dataType?: string;
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

export const http = (options: IHttp) => {
    const method = options.method || 'get';
    const baseUrl = options.baseUrl || window.HTTP_BASE;
    let url = options.url;
    // let params: any = {
    //     data: options.data,
    // }
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
            return data.data;
        });

    // return axios(baseUrl + url, {
    //     method,
    //     headers: Object.assign({
    //         'Content-Type': 'application/json',
    //     }, makeHeader()),
    //     ...params,
    // }).then((res: any) => {
    //     const data = res.data
    //     if (data.status !== 200 && !options.noErrorToast) {
    //         Toast.open({
    //             content: data.msg,
    //         });
    //     }
    //     if (options.dataType === 'root') {
    //         return data
    //     }
    //     return data.data
    // })
};

export const useFetch = (params: IHttp, options = {}) => {
    const example = useSWR(params.url, () => http(params), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        onSuccess: () => {
            appStore.setLoading(false);
        },
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            // 404 时不重试。
            if (error.status === 404) return;

            // 特定的 key 时不重试。
            // if (key === '/api/user') return

            // 最多重试 3 次。
            if (retryCount >= 3) return;

            // 5秒后重试。
            setTimeout(() => revalidate({ retryCount: retryCount }), 5000);
        },
        ...options,
    });
    return {
        ...example,
        isLoading: !example.error && !example.data,
    };
};
