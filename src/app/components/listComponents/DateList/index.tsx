import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import appStore from '@Stores/appStore';
import classNames from 'classnames';
import './index.scss';

interface DateListProps {
    timeList?: Array<any>;
    roundId?: string | number;
    updateFn?: (data?: any) => void;
    noNext?: boolean;
}

const scrollAnimation = (el: any, start: number, curIdx: number) => {
    const step = (15.2 / 100) * window.innerWidth;
    const end = curIdx * step;
    console.log(start, end, step);

    // 向右滑动的逻辑
    if (start < end) {
        start = start + 15;
        // 要是剩下的不够一步就直接撑满，防止页面出现滚动偏移错误
        if (start > end) {
            start = end;
        }
    }

    // 向左滑动的逻辑
    if (start > end) {
        start = start - 15;
        if (start < end) {
            start = end;
        }
    }

    el?.scrollTo?.(start, 0);

    // 要是开始和结束是一样的就不会安排下一次的滚动了
    // 在高刷新的屏幕上会有运行的比较块
    if (start !== end) {
        requestAnimationFrame(() => {
            scrollAnimation(el, start, curIdx);
        });
    }
};

const DateList = ({ timeList = [], roundId = '', updateFn = () => {}, noNext = true }: DateListProps): JSX.Element => {
    const [dateIndex, setDateIndex] = useState(-1);
    const [dateList, setDateList]: Array<any> = useState([]);
    const language = appStore.appSystemInfo.language || 'zh-CN';
    const dateRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (timeList && timeList.length > 0) {
            const temp: Array<any> = [];
            timeList.forEach((_item, index) => {
                if (_item.roundId === roundId && _item.state > 0) {
                    setDateIndex(index);
                    scrollAnimation(dateRef.current, dateRef.current?.scrollLeft || 0, index - 2);
                }
                const a = {
                    ..._item,
                    time: _item.startDate,
                    label: dayjs(_item.startDate).format('MM.DD'),
                    value: dayjs(_item.startDate).format('MM.DD'),
                };
                temp.push(a);
            });
            setDateList(temp);
        }
    }, [timeList]);

    const changeDateFn = (item: any, index: number) => {
        if (String(item.state) === '0' && noNext) {
            return;
        }
        scrollAnimation(dateRef.current, dateRef.current?.scrollLeft || 0, index - 2);
        setDateIndex(index);
        updateFn(dateList[index]);
    };

    return (
        <div className='date'>
            <div className='date-ul' ref={dateRef}>
                {dateList.map((item: any, index: number) => (
                    <div
                        key={index}
                        onClick={debounce(() => {
                            changeDateFn(item, index);
                        }, 200)}
                        className={classNames('date-li', index === dateIndex ? 'date-li-action' : '', item.state === 0 && noNext ? 'date-li-not' : '')}>
                        <span> {item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DateList;
