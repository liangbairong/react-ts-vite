import React, { useEffect, useReducer, memo } from 'react';

// import { request } from '@Lib/request';
import {http} from "@Lib/http";
import JudgeAppPendantMsg from '@Utils/judgeAppPendantMsg';

import { IPendantAutoFormat, InitData } from './types';

export const PendantAutoFormat: React.FC = memo((props: IPendantAutoFormat): JSX.Element | null => {
    const { pendantKey, requestConfig = {}, children, callback = () => {} } = props;
    if (typeof pendantKey !== 'string' || pendantKey === '') return null;

    // 计算表达式的值
    const evalSelf = (fn) => {
        const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
        return new Fn(`return ${fn}`)();
    };

    // 获取当前挂件数据，并和旧数据对比
    const formatReducer = (state, action) => {
        // 判断返回的roundId，并插入到相应的tab
        if (action.currentTime > state.currentTime) {
            return action;
        }
        return state;
    };

    const [formatData, setFormatData] = useReducer(formatReducer, { currentTime: 0 });

    // 获取当前挂件数据，并和旧数据对比
    const reducer = (state, action) => {
        // console.log('InitDatareducer', state.tsx, action);
        // 判断返回的roundId，并插入到相应的tab
        if (action.data && Array.isArray(action.data)) {
            // const data = action.data.find((ctxItem: InitData) => ctxItem.pendantName === pendantKey);
            // if (action.timestamp > state.tsx.timestamp) return data;
            // 避免首页拿不到timestamp
            setFormatData({ currentTime: action.timestamp });
            // 返回当前挂件数据
            return action.data.find((ctxItem: InitData) => ctxItem.pendantName === pendantKey);
        }
        return state;
    };

    const [initData, setInitData] = useReducer(reducer, {});

    useEffect(() => {
        console.log(
            '回传数据=======------------------',
            JSON.stringify(formatData),
            JSON.stringify(initData)
        );
        if (initData?.pendantName) {
            callback({ formatData, initData });
        }
    }, [formatData, initData]);

    useEffect(() => {
        if (initData?.pendantName && requestConfig?.url) {
            // request({ ...requestConfig }, requestConfig.method || 'get').then((res) => {
            //     // console.log(`组件内部请求接口========${JSON.stringify(res)}`);
            //     console.log('res', { ...res, currentTime: res.data?.eventTime || res.timestamp });
            //     setFormatData({ ...res, currentTime: res.data?.eventTime || res.timestamp });
            // });

            // @ts-ignore
            http({...requestConfig,dataType:'root'}).then(res=>{
                    console.log(`组件内部请求接口========`);
                    console.log({ ...res, currentTime: res.data?.eventTime || res.timestamp });
                    setFormatData({ ...res, currentTime: res.data?.eventTime || res.timestamp });
            })

        }
    }, [initData]);

    useEffect(() => {
        window['appRefreshTrigger'] = (res) => {
            // console.log('appRefreshTrigger', res);
            const data = evalSelf(`(${res})`);
            if (initData?.pendantName && data.bizKey === pendantKey) {
                setFormatData({
                    ...data.resource,
                    pendantStartTime: data.startTime,
                    pendantEndTime: data.endTime,
                    currentTime: data.currentTime,
                });
            }
        };
        return () => {
            window['appRefreshTrigger'] = null;
        };
    }, [initData]);

    useEffect(() => {
        new JudgeAppPendantMsg().trigger('pendant', setInitData);

        return () => {
            window['appInitTrigger'] = null;
        };
    }, []);

    return <div>{children}</div>;
});
