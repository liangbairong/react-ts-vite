import React, { lazy, Suspense } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import reactI18n from 'min-react-i18n';
import { Helmet } from 'react-helmet';
import Loading from 'elelive-ui/es/Components/Loading';
import 'elelive-ui/es/Components/Loading/index.css';
import appStore from '../stores/appStore';
/* 页面 */
const Index = lazy(() => import('../pages/index/index'));
/* 首页挂件 */
const Community = lazy(() => import('../pages/community/index'));

interface MetaProps {
    name: string;
    content: string;
}

interface IRoutesConfig {
    path: string;
    element: React.ReactNode;
    exact?: boolean;
    fallback?: boolean;
    title?: string;
    meta?: MetaProps[] | any;
}

interface RenderHelmetProps {
    title?: string;
    meta?: MetaProps[] | any;
}

const defaultRouterConfig = {
    path: '/',
    element: <Index />,
    exact: true,
    fallback: false,
    title: 'index',
    meta: [
        {
            name: 'viewport',
            content: 'width=750, user-scalable=no',
        },
    ],
};

const routesConfig: IRoutesConfig[] = [
    {
        path: '/',
        element: <Index />,
        exact: true,
        fallback: false,
        title: 'VJLevel',
        // meta: [
        //     {
        //         name: 'viewport',
        //         content: 'width=750, user-scalable=no',
        //     },
        // ],
    },
    {
        path: '/index',
        title: 'VJLevel',
        element: <Index />,
    },
    {
        path: '/community',
        title: 'VJLevel',
        element: <Community />,
    },
].map((customRoutesConfig) => ({ ...defaultRouterConfig, ...customRoutesConfig }));

// render helmet
const RenderHelmet: React.FC<RenderHelmetProps> = ({ meta = [], title }) => {
    console.log('-----1111----');
    console.log(title);
    return (
        <Helmet>
            {/*{meta.map(({ name, content }, index) => (*/}
            {/*    <meta key={index} name={name} content={content} />*/}
            {/*))}*/}
            <title>{title ? reactI18n.get(title) : 'Elelive'}</title>
        </Helmet>
    );
};

// render route
const RoutesComponents = () => {
    const location = useLocation();
    const items = routesConfig.find((item) => item.path === location.pathname);
    const { fallback, meta, title } = items || {};
    const element = useRoutes(routesConfig);

    appStore.updateAppUrl(location.search);

    return (
        <>
            <RenderHelmet meta={meta} title={title} />
            <Suspense fallback={<Loading open={fallback} fullScreen />}>{element}</Suspense>
        </>
    );
};

export default RoutesComponents;
