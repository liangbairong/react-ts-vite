import React, { FC, useState } from 'react';

import { observer } from 'mobx-react-lite';
import Loading from 'elelive-ui/es/Components/Loading';
import appStore from '@Stores/appStore';
// import { useStore } from '../../hooks';

import './index.scss';
// import { IStore } from '@Stores/appStore';

type IProps = {
    location: Record<string, any>;
};

const Webview: FC<IProps> = observer(({ title, style }): JSX.Element => {
    const [loading, setLoading] = useState(true);

    // const appStore = useStore<IStore>();

    const { url = '' } = appStore.params;

    /**
     *
     * iframe加载后回调
     *
     * */
    const handIframeLoad = () => {
        setLoading(false);
    };

    const styles = style || {
        animationName: 'player',
    };

    const src = `${url}?lang=${appStore.appSystemInfo.language}&region=${appStore.auth.region}`;
    console.log('src===', src);

    return (
        <div className="webview">
            {loading && <Loading open fullScreen />}
            <iframe
                style={styles}
                title={title}
                src={src}
                className="webview-iframe"
                scrolling="scroll"
                onLoad={() => handIframeLoad()}
            />
        </div>
    );
});

export default Webview;
