import React from 'react';
import '../scss/appLayout.scss';
import classNames from 'classnames';
import { Header } from '../components';

type AppLayoutProps = {
    headerImage?: JSX.Element,
    headerComponent?: JSX.Element;
    showHome?: boolean;
    children?: React.ReactNode;
    mode?: string; // 模块名字
};

const AppLayout: React.FC<AppLayoutProps> = ({
    headerImage,
    headerComponent,
    children,
    showHome = true,
    mode = '',
}: AppLayoutProps): JSX.Element => (
    <div className={classNames('appLayoutBox', mode === 'index' ? 'appLayoutBoxIndex' : '')}>
        <Header showHome={showHome} headerImage={headerImage}>{headerComponent}</Header>
        {children}
    </div>
);

export default AppLayout;
