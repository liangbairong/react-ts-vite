import axios, { Method, AxiosRequestConfig, AxiosResponse } from "axios";

import appStore from "../stores/appStore";

const logger = require("pino")();

import { Toast } from "../components";

// if (APP_ENV === 'dev') {
//   const mock = require('../../mock/index');
// }

const source = axios.CancelToken.source();


/* 错误处理Handle */
export const errorHandle = (error) => {
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        logger.warn(error.response);
    } else {
        // Something happened in setting up the request that triggered an Error
        logger.warn("Error", error.message);
    }
    logger.info(error.config);
};

export interface CustomAxiosResponse<T = any> {
    data: T;
    msg: string,
    status: number,
    timestamp: any,
    traceId: string,
}

export interface requestConfig {
    method?: Method,
    url?: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
}

const makeHeader = () => {
    const { language } = appStore.appSystemInfo;
    const { AppVersion, Device, deviceId, accessToken, uid, region } = appStore.auth;
    if (!accessToken || accessToken === "") {
        return { AppVersion, region, "Accept-Language": language || "zh-CN" };
    }
    const { nickName, ...resp } = appStore.auth;
    const reqHeader = Object.assign({ ...resp }, { "Accept-Language": language || "en" });
    return reqHeader;
};


/* 发送请求 */
export const request = (config: AxiosRequestConfig = {}, method: Method = "get"): Promise<CustomAxiosResponse<any> & AxiosResponse<any>> => {
    const options: Object = {
        // `url` 是用于请求的服务器 URL
        url: HTTP_BASE,

        // `method` 是创建请求时使用的方法
        method, // 默认是 get

        // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
        baseURL: HTTP_BASE,

        // `transformRequest` 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
        transformRequest: [function(data) {
            // 对 data 进行任意转换处理
            return JSON.stringify(data);
        }],

        // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
        transformResponse: [function(data) {
            // 对 data 进行任意转换处理
            return data;
        }],

        // `headers` 是即将被发送的自定义请求头,这里定义了一些例子
        headers: Object.assign({
            "Content-Type": "application/json"
        }, makeHeader()),

        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        params: {},

        // `paramsSerializer` 是一个负责 `params` 序列化的函数
        // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
        // paramsSerializer: function(params) {
        //   return params; //Qs.stringify(params, {arrayFormat: 'brackets'})
        // },

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        data: {},

        // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
        // 如果请求话费了超过 `timeout` 的时间，请求将被中断
        timeout: 60000,

        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: false, // 默认的

        // `adapter` 允许自定义处理请求，以使测试更轻松
        // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
        // adapter: function (config) {
        //   /* ... */
        // },

        // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
        // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
        // auth: {
        //   username: '',
        //   password: ''
        // },

        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: "json", // 默认的

        // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
        xsrfCookieName: "XSRF-TOKEN", // default

        // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
        xsrfHeaderName: "X-XSRF-TOKEN", // 默认的

        // `onUploadProgress` 允许为上传处理进度事件
        // onUploadProgress: function (progressEvent) {
        //   // 对原生进度事件的处理
        // },

        // `onDownloadProgress` 允许为下载处理进度事件
        // onDownloadProgress: function (progressEvent) {
        //   // 对原生进度事件的处理
        // },

        // `maxContentLength` 定义允许的响应内容的最大尺寸
        // maxContentLength: 2000,

        // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
        // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
        // 否则，promise 将被 reject
        // validateStatus: function (status) {
        //   return status >= 200 && status < 300; // 默认的
        // },

        cancelToken: source.token

    };

    return axios.request({ ...options, ...config });
};

/* 拦截器构造函数 */
export const AxiosInterceptors = function() {
};

AxiosInterceptors.prototype.addInterceptors = (type: string, resFunc, rejFunc) => {
    // 添加请求拦截器
    switch (type) {
        case "request":
            return axios.interceptors.request.use(resFunc, rejFunc);
        case "response":
            return axios.interceptors.response.use(resFunc, rejFunc);
        default:
            return axios.interceptors.request.use(resFunc, rejFunc);
    }
};

AxiosInterceptors.prototype.eject = (myInterceptor) => {
    axios.interceptors.request.eject(myInterceptor);
};

const AIS = new AxiosInterceptors();
/* request全局拦截器 */
AIS.addInterceptors("request", (config) => {
    if (config.url === "test1") {
        // 根据url拦截
    }
    return config;
}, (error) => Promise.reject(error));

/* response全局拦截器 */
AIS.addInterceptors("response", (config) => {
        /* 拦截器数据Start */
        console.log("config:", config);
        const { data = {} } = config;
        if (data?.status === 400) {
            Toast.open({
                content: data.msg
            });
        }
        // if (APP_ENV === "dev") {
        //     // pk
        //     if (config.config.url === "/ee/loveRank/timeLine") {
        //         return {
        //             "traceId": "6i9g4p2g15m8e9",
        //             "timestamp": 1652258514503,
        //             "status": 200,
        //             "data": {
        //                 "regionType": "XM",
        //                 "state": 5,
        //                 "roundInfos": [
        //                     { "startDate": 1652258100000, "endDate": 1652258400000, "roundId": 258100000, "settleEndTime": 14886, "state": 2 },
        //                     { "startDate": 1652258400000, "endDate": 1652259000000, "roundId": 258400000, "settleEndTime": 15486, "state": 2 },
        //                     {
        //                     "startDate": 1652259000000,
        //                     "endDate": 1652259600000,
        //                     "roundId": 259000000,
        //                     "settleEndTime": 16086,
        //                     "state": 2
        //                 },
        //                     { "startDate": 1652259600000, "endDate": 1652260200000, "roundId": 259600000, "settleEndTime": 16686, "state": 2 },
        //                     { "startDate": 1652260200000, "endDate": 1652260800000, "roundId": 260200000, "settleEndTime": 17286, "state": 2 },
        //                     {
        //                     "startDate": 1652260800000,
        //                     "endDate": 1652261400000,
        //                     "roundId": 260800000,
        //                     "settleEndTime": 17886,
        //                     "state": 2
        //                 },
        //                     { "startDate": 1652261400000, "endDate": 1652262000000, "roundId": 261400000, "settleEndTime": 18486, "state": 5 }]
        //             },
        //             "msg": ""
        //         };
        //     }
        //
        //     return config.data;
        // }
        /* 拦截器数据End */


        if (config.status === 200) {
            console.log(`请求接口${config.config.url}===>`, config.data);
            appStore.updateServerConfig({ timestamp: config.data.timestamp });
            return config.data;
        }
        return config;
    }, (error) => Promise.reject(error)
);

const get = (config: requestConfig) => request(config, "get");

const post = (config: requestConfig) => request(config, "post");

const del = (config: requestConfig) => request(config, "delete");

const head = (config: requestConfig) => request(config, "head");

const put = (config: requestConfig) => request(config, "put");

const patch = (config: requestConfig) => request(config, "patch");

/* 不要在api之外的其他页面引入request */
export {
    get,
    post,
    del,
    head,
    put,
    patch
};
