import React, { memo } from 'react';
import classNames from 'classnames';
import './index.scss';

interface IBox<T = any> {
    className?: string;
    title?: React.ReactNode | string;
    children?: React.ReactNode;
    type?: number;
}
const Box = ({ className, type = 1, title = '', children }: IBox) => {
    return (
        <div className={classNames('Box', type == 2 ? 'Box-2' : '', className)}>
            {title && <div className='Box-title'>{title}</div>}
            {children}
        </div>
    );
};

export default memo(Box);
