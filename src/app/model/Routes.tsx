import React, { memo, lazy, Suspense } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import intl from 'react-intl-universal';

import Loading from 'elelive-ui/es/Components/Loading';

import { IStore } from '@Stores/appStore';

import { AppContext } from '../context';

import { useStore } from '../hooks';


/* 页面 */
const Index = lazy(() => import('../pages/index/index'));

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
                        {width ?
                            <meta name="viewport" content={`width=${width},user-scalable=no`} />
                            :
                            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                        }
                        {title && <title>{title !== '' && intl.get(title)}</title>}
                    </Helmet>

                    <Suspense fallback={<Loading open={fallback} fullScreen />}>
                        <route.component {...props} routes={routes} />
                    </Suspense>
                </>
            )}
        />
    );
};

export const RouteWithSubRoutes = memo(
    RouteWithSubRoutesFn,
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
