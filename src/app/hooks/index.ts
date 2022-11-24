import React, { useEffect, useRef, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';
import appStore from '../stores/appStore';
import { http, IHttp } from '../lib/http';

interface ISWRResponse<T = any, E = any> extends SWRResponse<T, E> {
    isLoading: boolean;
}

export const useFetch = <R = any>(params: IHttp, options = {}): ISWRResponse<R, any> => {
    const example = useSWR<R>(params.key ? params.key : params.url, () => http(params), {
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
            setTimeout(() => revalidate({ retryCount: retryCount }), 5000);
        },
        ...options,
    });

    return {
        ...example,
        data: example.data,
        isLoading: !example.error && !example.data,
    };
};
export const useSkeletonState = (arr: Array<boolean> = []) => {
    const [f, setF] = useState(true);
    const t = useRef(Date.now());

    useEffect(() => {
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            const state = arr[i];
            if (!state) {
                index++;
            }
        }
        if (index === arr.length) {
            if (Date.now() - t.current >= 300) {
                setF(false);
            } else {
                setTimeout(() => {
                    setF(false);
                }, 300);
            }
        }
    }, arr);

    return f;
};

export const useCallbackState = (od: any) => {
    const cbRef = useRef<any>(null);
    const [data, setData] = useState(od);

    useEffect(() => {
        cbRef.current && cbRef.current(data);
    }, [data]);

    return [
        data,
        (d: any, callback: any) => {
            cbRef.current = callback;
            setData(d);
        },
    ];
};
