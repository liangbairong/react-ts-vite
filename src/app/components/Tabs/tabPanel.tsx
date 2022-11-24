import React from 'react';
import './index.scss';
import classNames from 'classnames';

export type ITabPanelProps = {
    focusedIdx: number;
    children: any;
    duration?: number;
    height?: number | string;
};

export const TabPanelView: React.FC<{ isFocused: boolean; children: any; duration: number }> = ({ isFocused, children, duration = 300 }) => {
    return <div className={classNames('panel-view', isFocused ? 'show' : 'hidden')}>{children}</div>;
};

const TabPanel: React.FC<ITabPanelProps> = ({ focusedIdx, duration = 300, children, height }) => {
    // const offset = -100 * focusedIdx;
    return (
        <div className='tab-panel'>
            <div
                className='panel'
                style={{
                    height: `${height ? height : 'auto'}`,
                    // transform: `translateX(${offset}%`,
                    transition: `all ${duration}ms`,
                }}>
                {React.Children.map(children, (child, i) => {
                    return (
                        <TabPanelView isFocused={focusedIdx === i} duration={duration}>
                            {React.cloneElement(child, {
                                key: `tab_item_${i}`,
                                isFocused: focusedIdx === i,
                            })}
                        </TabPanelView>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(TabPanel);
