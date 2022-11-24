import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';

type ITanabataDate = {
    timeList?: Array<any>;
    roundId?: string | number;
    updateFn?: (data?: any) => void;
    noNext?: boolean;
};

const DateList = ({ timeList = [], roundId = '', updateFn = () => {}, noNext = true }: ITanabataDate) => {
    const [dateIndex, setDateIndex] = useState(-1);
    const boxRef = useRef<any>(null);
    useEffect(() => {
        if (timeList && timeList.length > 0) {
            timeList.forEach((_item, index) => {
                if (_item === roundId) {
                    setDateIndex(index);
                    if (boxRef?.current) {
                        const w: number | any = document.querySelector('.date-list-li')?.clientWidth;
                        boxRef.current.scrollTo(w * index, 0);
                    }
                }
            });
        }
    }, [timeList]);

    const changeDateFn = (item: any, index: number) => {
        if (index > dateIndex && noNext) {
            return;
        }
        setDateIndex(index);
        updateFn(item);
    };

    return (
        <div className='date-list'>
            <div className='date-list-ul' ref={boxRef}>
                {timeList.map((item: any, index: number) => (
                    <div
                        key={`date-list-ul-li-${index}`}
                        onClick={() => {
                            changeDateFn(item, index);
                        }}
                        className={classNames('date-list-li', index === dateIndex ? 'date-list-li-action' : '', index > dateIndex && noNext ? 'date-list-li-not' : '')}>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DateList;
