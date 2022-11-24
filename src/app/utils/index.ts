import queryString from 'query-string';
// import appStore from '../stores/appStore';

export const onVisibilitychange = () => {
    const onVisibilitychangeFn = () => {
        console.log('执行页面监听事件');
        const isHidden = document.hidden;
        console.log(document.visibilityState);
        if (!isHidden) {
            // 清除当前事件
            document.removeEventListener('visibilitychange', onVisibilitychangeFn);
            window.location.reload();
        }
    };
    // 监听页面的隐藏事件
    document.addEventListener('visibilitychange', onVisibilitychangeFn);
};

export const filterParams = (searchArg = '', setArgKey = '', setArgValue = 0) => {
    const temp: Record<string, any> = {};
    const searchStr: string = searchArg || window.location.search;
    const params: Record<string, any> = queryString.parse(searchStr);
    for (const i in params) {
        if (params[i]) {
            if (Array.isArray(params[i]) && params[i].length > 0) {
                temp[i] = params[i][0];
            } else {
                temp[i] = params[i];
            }
        }
    }
    // 设置单一url参数
    if (setArgKey && setArgValue) {
        temp[setArgKey] = setArgValue;
    }
    return queryString.stringify(temp);
};

export const convertMoneyUnit = (value: number, type?: any) => {
    // if(typeof value !== 'number'){
    //   throw new Error('arguments must be a Number!')
    // }

    /* 默认转换带单位，如果输入了单位则按照单位转换 */
    switch (type) {
        case 'M':
            return value / Math.pow(1000, 2);
        case 'K':
            return value / Math.pow(1000, 1);
        default:
            if (value / Math.pow(1000, 2) > 1) {
                return value / Math.pow(1000, 2) + 'M';
            }
            if (value / Math.pow(1000, 1) > 1) {
                return value / Math.pow(1000, 1) + 'K';
            }
            return value;
    }
};

// 获取url 参数
export const getUrlParams = () => {
    let temp = window.location.hash;
    if (temp) {
        temp = temp.split('?')[1];
    } else {
        temp = window.location.search;
    }
    return queryString.parse(temp);
};

/* 兼容浏览器活性事件 */
export const getVisibilityOptions = () => {
    if (typeof document.hidden !== 'undefined') {
        return {
            hidden: 'hidden',
            visibilityChange: 'visibilitychange',
            state: 'visibilityState',
        };
    } else if (typeof document.mozHidden !== 'undefined') {
        return {
            hidden: 'mozHidden',
            visibilityChange: 'mozvisibilitychange',
            state: 'mozVisibilityState',
        };
    } else if (typeof document.msHidden !== 'undefined') {
        return {
            hidden: 'msHidden',
            visibilityChange: 'msvisibilitychange',
            state: 'msVisibilityState',
        };
    } else if (typeof document.webkitHidden !== 'undefined') {
        return {
            hidden: 'webkitHidden',
            visibilityChange: 'webkitvisibilitychange',
            state: 'webkitVisibilityState',
        };
    } else {
        return {
            hidden: 'hidden',
            visibilityChange: 'visibilitychange',
            state: 'visibilityState',
        };
    }
};

export const CheckVersion = (v1: string, v2: string) => {
    const v1Res = v1.split('.');
    const v2Res = v2.split('.');
    const len = Math.max(v1Res.length, v2Res.length);

    while (v1Res.length < len) {
        v1Res.push('0');
    }
    while (v2Res.length < len) {
        v2Res.push('0');
    }

    for (let i = 0; i < len; i += 1) {
        const num1 = parseInt(v1Res[i], 10);
        const num2 = parseInt(v2Res[i], 10);

        if (num1 > num2) {
            return 1;
        }
        if (num1 < num2) {
            return -1;
        }
    }
    return 0;
};

export function isPlainObject(obj: any) {
    let prototype;

    return Object.prototype.toString.call(obj) === '[object Object]' && ((prototype = Object.getPrototypeOf(obj)), prototype === null || prototype == Object.getPrototypeOf({}));
}

export function pxToVw(size: number) {
    // return document.body.clientWidth / 750 * size
    return (document.body.clientWidth / 750) * size;
}

export function plusVersion(url: string) {
    return url + '?v=' + import.meta.env.VITE_VERSION;
}

export function evalSelf(fn: any) {
    const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
    return new Fn(`return ${fn}`)();
}

export function isIos() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export const isWx = () => {
    const u = navigator.userAgent;
    // @ts-ignore
    return u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
};

export function isHuaWei() {
    const u = navigator.userAgent.toLowerCase();
    // @ts-ignore
    return u.match(/huawei/i) == 'huawei' || u.match(/honor/i) == 'honor';
}

export const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export function monitorValue(obj: any, key: string, handle: (val: any) => any) {
    if (obj) {
        Object.defineProperty(obj, key, {
            set(newVal) {
                handle(newVal);
                return newVal;
            },
        });
    } else {
        console.error(`Params obj => ${obj}. obj is error.`);
    }
}

export const formatNum = (num: string | number) => {
    if (!num) return num;
    let temp: number | string = num;
    if (typeof temp === 'number') {
        temp = temp.toString();
    }
    return parseFloat(temp).toLocaleString();
};

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';
// 封装一个回到底部或者顶部的函数
export const scrollToPosition = (position: number) => {
    // 使用requestAnimationFrame，如果没有则使用setTimeOut
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            return setTimeout(callback, 20);
        };
    }

    // 获取当前元素滚动的距离
    let scrollTopDistance = document.documentElement.scrollTop || document.body.scrollTop;

    const smoothScroll = () => {
        // 如果你要滚到顶部，那么position传过来的就是0，下面这个distance肯定就是负值。
        const distance = position - scrollTopDistance;
        // 每次滚动的距离要不一样，制造一个缓冲效果
        scrollTopDistance = scrollTopDistance + distance / 5;
        // 判断条件
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTopDistance);
            requestAnimationFrame(smoothScroll);
        }
    };
    smoothScroll();
};
