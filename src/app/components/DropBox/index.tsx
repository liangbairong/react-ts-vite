import React from 'react';
import classNames from 'classnames';

import useToggle from '@Hooks/useToggle';

import './index.scss';

export type DropBoxProps = {
    text?: string | React.ReactNode;
    content?: string | React.ReactNode;
    onClickHandle?: () => any;
    className?: string;
    list?: Array<{
        name: string | React.ReactNode;
        clickFunc: () => any;
    }>;
};

const DropBox: React.FC<DropBoxProps> = ({ text = '', onClickHandle, list, content = '', className }) => {
    const { show, onToggle } = useToggle();
    return (
        <div className={classNames('drop-box', className)}>
            <div className={classNames('mask', show ? 'show' : 'hidden')} onClick={onToggle}></div>
            <div className='drop-text' onClick={onClickHandle || onToggle}>
                {text}
            </div>
            <ul className={classNames('drop-list', show ? 'show' : 'hidden')}>
                <div className='triangle' />
                {content && <li className='content'>{content}</li>}
                {list &&
                    list.map((item, index) => (
                        <li key={`${index}_key`} onClick={item.clickFunc}>
                            {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default React.memo(DropBox);
