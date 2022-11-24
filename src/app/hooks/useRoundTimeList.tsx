import { useEffect, useState } from 'react';
import { useCallbackState, useSkeletonState } from './index';
import api from '@Lib/api';
import appStore from '../stores/appStore';
import { mutate } from 'swr';

const useRoundTimeList = () => {
    const [action, setAction] = useCallbackState(null);
    // 时间轴
    const [timeList, setTimeList] = useState([]);
    const { data, isLoading } = api.useGuessTimeline({});

    useEffect(() => {
        if (data?.nodeNames) {
            setTimeList(data.nodeNames);
            setAction(data.currNodeName);
        }
    }, [data]);

    const onDateListCallback = (param: any, callback?: () => void) => {
        setAction(param, () => {
            appStore.setLoading(true);
            mutate('/ee/guess/timelineNode');
            callback && callback();
        });
    };
    return {
        data,
        isLoading,
        action,
        timeList,
        onDateListCallback,
    };
};

export default useRoundTimeList;
