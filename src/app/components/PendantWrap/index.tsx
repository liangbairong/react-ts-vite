import React, { useEffect, useReducer } from 'react';

import { http, IHttp } from '@Lib/http';
import { evalSelf, monitorValue } from '@Utils/index';
import JudgeAppPendantMsg from '@Utils/judgeAppPendantMsg';
import { PandantWrapComponentProps, PendantMsgInfo, PendantMsgResponse, IMPendantData, PendantDataResponse } from './types';

const PandantWrapComponent: React.FC<PandantWrapComponentProps<IHttp>> = (props: PandantWrapComponentProps<IHttp>) => {
    const { children, pendantKey, requestConfig, onCallBack, hideBtnCallBack } = props;

    /**
     * @desc 遍历挂件Key找到当前挂件
     */
    const pendantMsgReducer = (state: PendantMsgInfo, action: PendantMsgResponse) => {
        if (action.data && Array.isArray(action.data)) {
            return action.data.find((ctxItem) => ctxItem.pendantName === pendantKey);
        }
        return state;
    };
    const [pendantMsg, setPendantMsg] = useReducer<(state: PendantMsgInfo, action: PendantMsgResponse) => any>(pendantMsgReducer, {});

    /**
     * @desc IM数据or第一次接口数据
     */
    const pendantDataReducer = (state: any, action: any) => {
        if (action.currentTime > state.currentTime) {
            return action;
        }
        return state;
    };
    const [pendantData, setPendantData] = useReducer<(state: any, action: any) => any>(pendantDataReducer, {
        currentTime: 0,
    });

    console.log(`pendantKey => ${pendantKey}`);
    useEffect(() => {
        console.log(
            `回传数据 => 业务: ${JSON.stringify(pendantData)};
             配置: ${JSON.stringify(pendantMsg)}`,
        );
        if (pendantMsg && pendantMsg.pendantName && pendantData && pendantData.currentTime !== 0) {
            onCallBack({ initData: pendantMsg, pendantData: pendantData });
        }
    }, [pendantMsg, pendantData]);

    useEffect(() => {
        console.log(`pendantMsg => ${JSON.stringify(pendantMsg)}`);
        if (pendantMsg.pendantName) {
            http(requestConfig).then((resp) => {
                console.log(`组件内部请求接口 => ${JSON.stringify(resp)}`);
                setPendantData({
                    ...resp.data,
                    pendantStartTime: pendantMsg.startTime,
                    pendantEndTime: pendantMsg.endTime,
                    currentTime: resp.data?.eventTime || resp.timestamp,
                    hidePedant: !resp.data,
                });
            });
        }
    }, [pendantMsg]);

    useEffect(() => {
        // 需要回调隐藏挂件按钮则进行数据拦截监听【仅限右上角子挂件】
        if (hideBtnCallBack && window.hiddenPendantBtnStatus) {
            if (window.hiddenPendantBtnStatus && window.hiddenPendantBtnStatus.data && window.hiddenPendantBtnStatus.data.hidden) {
                hideBtnCallBack(window.hiddenPendantBtnStatus.data);
            }
            monitorValue(window.hiddenPendantBtnStatus, 'data', hideBtnCallBack);
        }

        window['appRefreshTrigger'] = (res: string) => {
            const data: IMPendantData = evalSelf(`(${res})`);

            console.log(`IM Data ==>> ${JSON.stringify(data)}`);
            if (pendantMsg.pendantName && data.bizKey === pendantKey) {
                // 兼容部分挂件通过服务端更新推流控制隐藏
                const hidePedant = data?.resource?.showPedant === 0 ? { hidePedant: true } : {};
                setPendantData({
                    ...data.resource.data,
                    ...hidePedant,
                    pendantStartTime: data.startTime,
                    pendantEndTime: data.endTime,
                    currentTime: data.currentTime,
                });
            }
        };
    }, [pendantMsg]);

    useEffect(() => {
        new JudgeAppPendantMsg().trigger('pendant', setPendantMsg);
        return () => {
            window['appInitTrigger'] = null;
        };
    }, []);

    return <>{children}</>;
};

export default React.memo(PandantWrapComponent);
