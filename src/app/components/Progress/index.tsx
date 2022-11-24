import React, { useMemo } from 'react';
import './index.scss';

type ProgressProps = {
    max: number;
    value: number;
    showValue?: number;
    orders?: 'asc' | 'dec';
    valueText?: string | React.ReactNode;
    bgColor?: string;
    barColor?: string;
    progressStyle?: React.CSSProperties;
    barStyle?: React.CSSProperties;
};

const IProgress = (props: ProgressProps) => {
    const { max, value, showValue, valueText = '', orders = 'asc', ...other } = props;

    const newBarValue = useMemo(() => {
        if (orders === 'asc') {
            return value === -1 ? max : value;
        } else {
            return value === -1 ? max : max - value;
        }
    }, [value, max, orders]);

    const newValue = useMemo(() => {
        if (value === -1 || (orders === 'dec' && value === 0)) return '';
        return value;
    }, [value, orders]);

    return (
        <div
            className='progress'
            style={{
                backgroundColor: other.bgColor,
                ...other.progressStyle,
            }}>
            <div className='num-progress'>
                {valueText}
                {showValue || newValue}
            </div>
            <div
                className='progress-bar'
                style={{
                    width: `${(newBarValue / max) * 100}%`,
                    backgroundColor: other.barColor,
                    ...other.barStyle,
                }}
            />
        </div>
    );
};

export default IProgress;
