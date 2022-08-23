import React, { FC, useEffect, useState } from 'react';
import Dialog from 'elelive-ui/es/Components/Dialog';
import 'elelive-ui/es/Components/Dialog/index.css';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import { LangChange } from '@Components/index';
import JSBridge from '@Utils/JSBridge';
import { Text } from '@Components/Text';
import './index.scss';
import JudgeAppPendantMsg from '@Utils/judgeAppPendantMsg';
import { loadImg } from '@Utils/index';

type IDialog = {
    info: any;
    setOpen: any;
};

type IAnchorInfo = {
    avatar?: string;
};

const AnchorInfo: FC<IAnchorInfo> = ({ avatar = '' }: IAnchorInfo): JSX.Element => {
    return (
        <div className="dialog-header">
            <Img src={avatar} className="anchor-avatar" />
        </div>
    );
};

// 决赛
const Top: React.FC<IDialog> = ({ info, setOpen }: IDialog): JSX.Element => (
    <div className="dialog-top">
        <AnchorInfo avatar={info?.headImage} />
        <div className="dialog-middle-content">
            <div className="dialog-top-anchor">
                <Text i18nKey="CongratulationstotheVJ" options={{ value: info?.nickName }}>
                    恭喜主播获得
                </Text>
            </div>
            <div className="dialog-top-name">
                <Text i18nKey="HeartbeatDailylist">心动日榜</Text>
            </div>
            <div className="dialog-top-rank" data-text={`TOP ${info?.rank || 1}`}>
                TOP {info?.rank || 1}
            </div>
            <div className="dialog-top-close" onClick={() => setOpen(false)}>
                <Text i18nKey="Close">关闭</Text>
            </div>
        </div>
    </div>
);
const imgArr: any = {
    top: [new URL('@Assets/images/dialog/daily/bg.png',import.meta.url).href],
};

const DailyDialog: React.FC<IDialog> = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [info, setInfo] = useState<Record<string, any>>({});

    // const [language] = useState<any>(appStore.appSystemInfo.language || appStore.params.lang || 'zh-CN');

    useEffect(() => {
        loadImg(imgArr['top'], () => {
            new JudgeAppPendantMsg().trigger('dialog', () => {
                const res = window.appPendantMsg;
                if (res?.resource) {
                    const data = res?.resource?.source || {};
                    console.log('----data----');
                    console.log(JSON.stringify(res));
                    setInfo(data);
                    setOpen(true);
                    JSBridge.closeBtn();
                } else {
                    console.log('appPendantMsg?.resource 无值');
                }
            });
        });
    }, []);

    const onAnimateEnd = () => {
        console.log('关闭webview');
        JSBridge.appCloseWeb();
    };
    const DialogClose = () => {
        setOpen(false);
        console.log('关闭setOpen');
    };
    return (
        <div className="dialog-wrap">
            {/* {APP_ENV !== 'prod' && <LangChange />} */}
            <Dialog
                open={open}
                onAnimateEnd={onAnimateEnd}
                onClose={DialogClose}
                showMask
                maskClosable
                className={classNames('dialog-daily')}
                isBescroll
            >
                <Top info={info} setOpen={setOpen} />
            </Dialog>
        </div>
    );
};

export default DailyDialog;
