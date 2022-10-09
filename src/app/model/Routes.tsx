import React, { memo, lazy, Suspense } from 'react';
import reactI18n from 'min-react-i18n';
import { Switch, Route, withRouter } from 'react-router-dom';
import appStore from '../stores/appStore';
// @ts-ignore
import { Helmet } from 'react-helmet';

/* 页面 */
{
    /*TODO:ios11报错*/
}
// const Index = lazy(() => import('../pages/index/index'));
import Index from '../pages/index/index';
import Community from '../pages/community/index';

const routesConfig = [
    {
        path: '/',
        component: Index,
        exact: true,
        title: 'VJLevel',
    },
    {
        path: '/home',
        component: Index,
        exact: true,
        title: 'VJLevel',
    },
    {
        path: '/community',
        component: Community,
        exact: true,
        title: 'xx',
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
    fallback?: boolean;
};

export const RouteWithSubRoutesFn: React.FC<IRouteWithSubRoutes> = (route: IRouteWithSubRoutes): JSX.Element => {
    const { path = '', routes, title, fallback = true } = route;
    return (
        <Route
            path={path}
            render={({ staticContext, ...props }) => (
                // pass the sub-routes down to keep nesting
                <>
                    <Helmet>{title && <title>{title !== '' && reactI18n.get(title)}</title>}</Helmet>
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
    (prevProps: IPropsAreEqual, nextProps: IPropsAreEqual) => prevProps.path === nextProps.path,
);

const Routes = withRouter(({ location }) => {
    appStore.updateAppUrl(location.search);

    return (
        <Switch>
            {routesConfig
                .filter((item) => item.path === location.pathname)
                .map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
        </Switch>
    );
});

export default Routes;
