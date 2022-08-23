import useSWR from "swr";
import Toast from 'elelive-ui/es/Components/Toast';
import appStore from "@Stores/appStore";
import queryString from "query-string";
import axios from 'axios';

interface IHttp{
    url:string,
    data?:any,
    method?:string,
    baseUrl?:string,
    noErrorToast?:boolean,
    dataType?:string
}

const makeHeader = () => {
    const {language} = appStore.appSystemInfo;
    const {AppVersion, accessToken} = appStore.auth;
    const region = appStore.params?.regionType || appStore.auth?.region || appStore.params?.region
    if (!accessToken) {
        return {AppVersion, region, 'Accept-Language': language || 'zh-CN'};
    }
    const {nickName, ...resp} = appStore.auth;
    return Object.assign({...resp}, {'Accept-Language': language || 'en',region});
};



export const http = (options:IHttp) => {
    const method = options.method || 'get'
    const baseUrl = options.baseUrl ||  HTTP_BASE
    let url = options.url
    let params: any = {
        data: options.data,
    }
    if (method === 'get') {
        const stringData = queryString.stringify(options.data)
        url = url + (stringData ? `?${stringData}` : '')
        params = {}
    }
    return axios(baseUrl + url, {
        method,
        headers: Object.assign({
            'Content-Type': 'application/json',
        }, makeHeader()),
        ...params,
    }).then((res:any) => {
        const data=res.data
        if (data.status !== 200 && !options.noErrorToast) {
            Toast.open({
                content: data.msg,
            });
        }
        if(options.dataType==='root'){
            return data
        }
        return data.data
    })
}


export const useFetch = (params, options={}) => {
    const example = useSWR(params, http, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount:true,
        ...options
    })
    return {
        ...example,
        isLoading: !example.error && !example.data,
    }
}

