import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { isIos } from '../../utils';
import './index.scss';

interface IBetBox<T = any> {
    value: T;
    type?: string;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    container?: string;
    onInputChange: (num: any) => void;
    onInputBlur: () => void;
}

const NumInput = ({ value = '', className = '', placeholder, type = 'tel', maxLength = 1000, container = '', onInputChange = () => {}, onInputBlur = () => {} }: IBetBox) => {
    const [num, setNum] = useState<string | number>('');

    useEffect(() => {
        return () => {
            delClass();
        };
    }, []);
    useEffect(() => {
        setNum(value);
    }, [value]);
    const onChange = (e: any) => {
        const v = Number(e.target.value.replace(/[^0-9]/g, ''));
        setNum(v);
        onInputChange(v);
    };

    const onFocus = () => {
        if (container && !isIos()) {
            const dom: any = document.querySelector(container);
            if (dom) {
                dom.classList.add('input-container');
            }
        }
    };

    const onBlur = () => {
        delClass();
        onInputBlur();
    };

    const delClass = () => {
        if (container && !isIos()) {
            const dom: any = document.querySelector(container);
            if (dom) {
                dom.classList.remove('input-container');
            }
        }
    };

    return (
        <input
            className={classNames('control-input', className)}
            type={type}
            placeholder={placeholder}
            value={num}
            maxLength={maxLength}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};

export default memo(NumInput);
