import React, { Suspense, useEffect, useState } from 'react';
import TabMenu from 'elelive-ui/es/Components/TabMenu';
import Loading from 'elelive-ui/es/Components/Loading';

import 'elelive-ui/es/Components/TabMenu/index.css';
import 'elelive-ui/es/Components/Loading/index.css';
import appStore from '@Stores/appStore';
import classNames from 'classnames';

type ITabTitle = {
    label?: string | React.ReactNode;
    value?: string | number;
    path?: string | number;
};

type ITabContent = {
    tabMenuClassName?: string;
    contentClassName?: string;
    tabMenuBoxClassName?: string;
    tabTitle: ITabTitle[];
    tabChangeHandle?: React.EventHandler<any>; // 返回事件
    children?: any;
    urlKey?: string;
    dynamicKey?: string;
};

export const TabContent: React.FC<ITabContent> = ({
    tabMenuClassName = '',
    contentClassName = '',
    tabMenuBoxClassName = '',
    tabTitle = [],
    tabChangeHandle = () => {},
    children = [],
    urlKey = 'curTab',
    dynamicKey = '',
}: ITabContent) => {
    const [renderPage, setRenderPage] = useState<Array<string | number>>([]);
    // @ts-ignore
    const [curTab, setCurTab] = useState(appStore.params[urlKey] || tabTitle[0].path);
    const tabChange = (data: ITabTitle) => {
        const { path } = data;
        setCurTab(path);
        tabChangeHandle(data);
    };
    useEffect(() => {
        if (curTab && !renderPage?.includes(curTab)) {
            setRenderPage([...renderPage, curTab]);
        }
    }, [curTab]);
    useEffect(() => {
        if (dynamicKey && dynamicKey !== curTab) {
            setCurTab(dynamicKey);
        }
    }, [dynamicKey]);

    return (
        <div className={classNames(tabMenuBoxClassName, 'tab_main')}>
            <TabMenu menuList={tabTitle} onMenuChange={tabChange} path={curTab} className={tabMenuClassName} />

            <div className={classNames(contentClassName, 'tab_content')}>
                {tabTitle.map((child, index) => {
                    if (renderPage.includes(child?.value || '')) {
                        return (
                            <div key={index} className={`packages-${child?.value}`} hidden={child?.value !== curTab}>
                                {children ? children[index] : <div style={{ display: 'none' }} />}
                            </div>
                        );
                    }
                    return <div style={{ display: 'none' }} key={index} />;
                })}
            </div>
        </div>
    );
};
