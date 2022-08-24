import React, { memo, lazy, Suspense } from 'react';
import intl from "react-intl-universal";
import { Switch, Route, withRouter } from 'react-router-dom';
// @ts-ignore
import { Helmet } from 'react-helmet';

import Loading from 'elelive-ui/es/Components/Loading';

import { IStore } from '@Stores/appStore';

import { AppContext } from '../context';

import { useStore } from '../hooks';


/* 页面 */
{/*TODO:ios11报错*/}
// const Index = lazy(() => import('../pages/index/index'));

import Index from '../pages/index/index'
const routesConfig = [
    {
        path: '/',
        component: Index,
        exact: true,
        title: 'Loveandexpressionactivity',
        width: 750,
    },
    {
        path: '/home',
        component: Index,
        exact: true,
        title: 'Loveandexpressionactivity',
        width: 750,
    },
];

type IPropsAreEqual = {
    path: string;
};

type IRouteWithSubRoutes = {
    path?: string;
    routes?: object;
    component?: any;
    title?: string;
    width?: number;
    fallback?: boolean;
};

export const RouteWithSubRoutesFn: React.FC<IRouteWithSubRoutes> = (
    route: IRouteWithSubRoutes
): JSX.Element => {
    const { path = '', routes, title, width, fallback = true } = route;
    return (
        <Route
            path={path}
            render={({ staticContext, ...props }) => (
                // pass the sub-routes down to keep nesting
                <>
                    <Helmet>
                        {title && <title>{title !== '' && intl.get(title)}</title>}
                    </Helmet>
                    {/*TODO:ios11报错*/}
                    {/*<Suspense fallback={<Loading open={fallback} fullScreen />}>*/}
                    {/*    <route.component {...props} routes={routes} />*/}
                    {/*</Suspense>*/}
                    <route.component {...props} routes={routes} />
                </>
            )}
        />
    );
};


export const RouteWithSubRoutes = memo(
    RouteWithSubRoutesFn,
    // @ts-ignore
    (prevProps: IPropsAreEqual, nextProps: IPropsAreEqual) => prevProps.path === nextProps.path
);

const Routes = withRouter(({ location }) => {
    const appStore = useStore<IStore>(AppContext);
    appStore.updateAppUrl(location.search);

    return (
        <Switch>
            {routesConfig.filter((item) => item.path === location.pathname)
                .map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
        </Switch>
    );
});

export default Routes;
