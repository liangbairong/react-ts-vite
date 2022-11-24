import React from 'react';
import classNames from 'classnames';

import './index.scss';

export type ITabsProps = {
    focusedIdx: number;
    children: any;
    onChange: (index: number, event: React.MouseEvent) => void;
    duration?: number;
};

const Tabs: React.FC<ITabsProps> = ({ focusedIdx, onChange, duration = 300, children }) => {
    return (
        <div className='tabs'>
            {React.Children.map(children, (child, i) => {
                return React.cloneElement(child, {
                    key: `tab_item_${i}`,
                    isFocused: focusedIdx === i,
                    onClick: (e: React.MouseEvent) => {
                        onChange(i, e);
                    },
                });
            })}
        </div>
    );
};

const TabItem = ({ title, onClick, isFocused }: { title: string | React.ReactNode; onClick?: () => void; isFocused?: boolean }) => {
    return (
        <div className={classNames('tabs-item-btn', isFocused && 'tabs-item-btn-activing')} onClick={onClick}>
            {title}
        </div>
    );
};

export { TabItem };
export default React.memo(Tabs);
