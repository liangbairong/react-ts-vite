import queryString from 'query-string';
// import appStore from '../stores/appStore';

/* 节流函数 */
export const throttle = (fn, delay) => {
    let timer;
    return function () {
        let _this = this;
        let args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
        }, delay);
    };
};

/* 防抖函数 */
export const debounce = (fn, delay) => {
    let timer;
    return function () {
        let _this = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
};
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

export const makeAppointArray = (arr, len = 0) => {
    if (!Array.isArray(arr)) {
        throw new Error('arguments is not a Array!');
    }
    return new Array(len).fill('').map((item, index) => {
        if (arr[index]) {
            item = arr[index];
        }
        return item;
    });
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

export const filterParams=(searchArg = '',setArgKey='',setArgValue= 0)=> {
    const temp = {};
    const searchStr:string = searchArg || window.location.search
    const params:Object = queryString.parse(searchStr);
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
    if(setArgKey && setArgValue) {
        temp[setArgKey] = setArgValue
    }
    return queryString.stringify(temp);
}

// 获取url 参数
export const getUrlParams=()=> {
    let temp = window.location.hash;
    if(temp){
        temp=temp.split("?")[1]
    }else{
        temp=window.location.search
    }
    return queryString.parse(temp)
}

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

export const CheckVersion = (v1, v2) => {
    let v1Res = v1;
    let v2Res = v2;
    v1Res = v1Res.split('.');
    v2Res = v2Res.split('.');
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

/* 格式化数字 */
export const formatNum = (num) => {
    return parseFloat(num).toLocaleString()
}

/* 格式化数字1 */
export const formatNum1 = (num) => {
    if (!num) return num
    return parseFloat(num).toLocaleString()
}

//
// const comparePackage = (version) => {
//     const { AppVersion = '0.0.0' } = appStore.auth;
//     if (typeof version !== 'string') {
//         throw new Error('version is not a string!');
//     }
// };

/* 加载图片 */
export const loadImg = (imgArr, callback) => {
    for (let i = 0; i < imgArr.length; i++) {
        const img = new Image()
        let temp = imgArr[i]
        img.src = temp
        img.onload = () => {
            if(i===imgArr.length-1){
                callback && callback()
            }
        }
        img.onerror = () => {
            console.log('图片加载失败:' + temp)
        }
    }
}

export function isPlainObject(obj){
    let prototype;

    return Object.prototype.toString.call(obj) === '[object Object]'
        && (prototype = Object.getPrototypeOf(obj), prototype === null ||
        prototype == Object.getPrototypeOf({}))
}

// 自动给服务端返回的图片链接增加处理参数
export function processingPictureSuffix(url) {
    if(typeof url !== 'string'){
        return url;
    }
    // 拆分url
    const urlArray = url.split('?');
    // 获取basename
    const basename = urlArray.find(item => item.indexOf('://') !== -1) || ''
    // 判断是否腾讯云或其他云资源
    if(basename.indexOf('www.9yiwums.com') !== -1){
        // 腾讯云使用!1x方式
        return basename + '!1x?' + urlArray.slice(1, urlArray.length).join('');
    }else{
        // 其他云资源使用样式拼接，避免污染url
        if(url.indexOf('?') !== -1){
            return url + '&x-oss-process=style%2F1x';
        }else{
            return url + '?x-oss-process=style%2F1x';
        }
    }
}


export function getImgUrl(url:string){
    return new URL('../../assets'+url,import.meta.url).href
}