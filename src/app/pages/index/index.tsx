import React, { FC, useEffect, useState, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import intl from 'react-intl-universal';
import queryString from 'query-string';
import TabMenu from 'elelive-ui/es/Components/TabMenu';
import Loading from 'elelive-ui/es/Components/Loading';
import { debounce } from '@Utils/index';
import { Text, LangChange } from '@Components/index';
import appStore from '@Stores/appStore';
import AppLayout from '../../layouts/AppLayout';

import './index.scss';


const Rank = lazy(() => import('./components/rank'));
const LuckyView = lazy(() => import('./components/Lucky'));

const HomeView: FC = (): JSX.Element => {
    const [initPackages, setInitPackages] = useState<string[]>([]);
    const history = useHistory();
    const { curTab = 'rank' } = appStore.params;

    const tab = [
        {
            label: intl.get('HeartbeatdailylistTab') || '心动日榜2',
            value: 'rank',
            path: 'rank',
        },
        {
            label: intl.get('Heartbeatluckyone') || '心动幸运儿',
            value: 'lucky',
            path: 'lucky',
        },
    ];

    // 打开规则页面
    const openMyRecord = () => {
        history.push(
            '/webview?url=https://showme-h5.oss-accelerate.aliyuncs.com/activity/product-items/2022Year/May/520_hdgz/index.html'
        );
    };

    // Menu点击事件
    const onMenuChange = (data) => {
        // console.log('点击事件....');
        const { path } = data;
        const search = queryString.stringify({ ...appStore.params, curTab: path });
        history.replace(`/index?${search}`);
    };

    // 通过curTab自动初始化子组件
    useEffect(() => {
        if (!initPackages.find((item) => item === curTab)) {
            setInitPackages([...initPackages, curTab]);
        }
    }, [curTab]);

    return (
        <AppLayout
            mode="index"
            showHome={false}
            headerComponent={
                <>
                    <div className="header-menu-item" onClick={openMyRecord}>
                        <span>
                            <Text i18nKey="Rules">规则</Text>
                        </span>
                    </div>
                </>
            }
        >
            <div className="home">
                {/* {APP_ENV !== 'prod' && <LangChange />} */}
                <div className="menu">
                    <TabMenu
                        className={classNames('index-tab')}
                        menuList={tab}
                        path={curTab}
                        onMenuChange={(data) => debounce(onMenuChange(data), 300)}
                    />
                </div>
                <div className="packages">
                    {initPackages.includes('rank') && (
                        <div className="packages-star" hidden={curTab !== 'rank'}>
                            <Suspense fallback={<Loading open />}>
                                <Rank />
                            </Suspense>
                        </div>
                    )}
                    {initPackages.includes('lucky') && (
                        <div className="packages-moat" hidden={curTab !== 'lucky'}>
                            <Suspense fallback={<Loading open />}>
                                <LuckyView />
                            </Suspense>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

// const Index2 = () => {
//     return (
//         <>
//             <FillText className="fillText">thanks is me force is shi bush</FillText>
//             <FillText className="fillText"><span>我是</span></FillText>
//         </>
//     );
// };
export default HomeView;
