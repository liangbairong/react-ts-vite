import React, { lazy } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import reactI18n from 'min-react-i18n';
import { Helmet } from 'react-helmet';

import appStore from '../stores/appStore';
//首页
import Home from '../pages/home/index';
interface MetaProps {
    name: string;
    content: string;
}

interface IRoutesConfig {
    path: string;
    element: React.ReactNode;
    isBackground?: boolean;
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
    element: <Home />,
    fallback: false,
    isBackground: true,
    title: 'index',
};

const routesConfig: IRoutesConfig[] = [
    {
        path: '/',
        element: <Home />,
        fallback: false,
        title: 'CrazyWorldCup',
    },
    {
        path: '/home',
        title: 'CrazyWorldCup',
        element: <Home />,
    },
].map((customRoutesConfig) => ({ ...defaultRouterConfig, ...customRoutesConfig }));

// render helmet
const RenderHelmet: React.FC<RenderHelmetProps> = ({ title }) => {
    // console.log('-----1111----');
    // console.log(title);
    return (
        <Helmet>
            {/*{meta.map(({ name, content }, index) => (*/}
            {/*    <meta key={index} name={name} content={content} />*/}
            {/*))}*/}
            <title>{title ? reactI18n.get(title) : ''}</title>
        </Helmet>
    );
};

// render route
const RoutesComponents = () => {
    const location = useLocation();
    const items: IRoutesConfig | any = routesConfig.find((item) => item.path === location.pathname);
    // const { fallback, meta, title } = items || {};
    if (items?.isBackground) {
        document.documentElement.classList.add('is-background');
    } else {
        document.documentElement.classList.remove('is-background');
    }
    const { meta, title } = items || {};
    const element = useRoutes(routesConfig);
    appStore.updateAppUrl(location.search);
    window.scroll(0, 0);
    return (
        <>
            <RenderHelmet meta={meta} title={title} />
            {element}
            {/*<Suspense fallback={<Loading open={fallback} fullScreen />}>{element}</Suspense>*/}
        </>
    );
};

export default RoutesComponents;
