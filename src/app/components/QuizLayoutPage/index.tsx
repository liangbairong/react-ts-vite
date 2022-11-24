import React, { memo, useState } from 'react';

import LayoutPage from '../LayoutPage';
import QuizRecordDialog from '../QuizRecordDialog';
import './index.scss';
import Text from '../Text';
import { plusVersion } from '../../utils';
import appStore from '../../stores/appStore';
import JSBridge from '../../utils/JSBridge';
interface IBetBox<T = any> {
    children: T;
}
const QuizLayoutPage = ({ children }: IBetBox) => {
    const [open, setOpen] = useState<boolean>(false);
    const { accessToken } = appStore.auth;
    const openDialog = () => {
        if (!accessToken) {
            JSBridge.toAppLogin();
            return;
        }
        setOpen(!open);
    };
    return (
        <LayoutPage
            text={<Text i18nKey='more'>更多</Text>}
            headerImage={{
                'zh-CN': plusVersion('/images/quizPoints/title-zh.png'),
                'zh-TW': plusVersion('/images/quizPoints/title-tw.png'),
                en: plusVersion('/images/quizPoints/title-en.png'),
                vi: plusVersion('/images/quizPoints/title-en.png'),
                id: plusVersion('/images/quizPoints/title-en.png'),
            }}
            list={[{ name: <Text i18nKey='QuizRecords'>竞猜记录</Text>, clickFunc: openDialog }]}>
            <div className='QuizLayoutPage'>{children}</div>

            <QuizRecordDialog open={open} setOpen={setOpen} />
        </LayoutPage>
    );
};

export default memo(QuizLayoutPage);
