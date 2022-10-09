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
export function isIos() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export const isWx = () => {
    const u = navigator.userAgent;
    // @ts-ignore
    return u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
};
