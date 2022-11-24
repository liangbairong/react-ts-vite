import React, { useState, useCallback, useImperativeHandle, memo } from 'react';
import Text from '@Components/Text';
import api from '@Lib/api';
import Dialog from 'elelive-ui/es/Components/Dialog';
import Img from 'elelive-ui/es/Components/Img';
import { plusVersion } from '@Utils/index';
import Box from '../Box';
import { Link } from 'react-router-dom';

interface IBetDialog {
    cRef: any;
}
const useErrorFreeCardDialog = ({ cRef }: IBetDialog) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(cRef, () => ({
        open,
        show: (state: boolean) => {
            setOpen(state);
        },
    }));

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        onClose,
    };
};

// 积分不足
export const NotPointsDialog = memo((props: IBetDialog) => {
    const { open, onClose } = useErrorFreeCardDialog(props);
    return (
        <Dialog open={open} showMask maskClosable className={'Insufficient-points'}>
            <Box type={2} className='ef-dialog'>
                <div className='ef-dialog-title'>
                    <Text i18nKey='InsufficientPoints'>剩余积分不足</Text>
                </div>
                <div className='ef-dialog-tip'>
                    <Text i18nKey='YouCanGetMorePointsInTheFollow'>可通过以下活动获取更多积分</Text>
                </div>
                <div className='ef-dialog-content'>
                    <div className='points-icon'>
                        <Img className='points-icon-img' src={plusVersion('/images/quizPoints/points-icon.png')} />
                    </div>
                    <div className='points-name'>
                        <Text i18nKey='CompleteThePointsTask'>完成积分任务</Text>
                    </div>
                    <div className='points-go'>
                        <Link to='/integralTask'>
                            <Text i18nKey='GoToParticipate'>前往参与</Text>
                        </Link>
                    </div>
                    <div className='points-right'>{'>'}</div>
                </div>
                <div className='ef-dialog-footer'>
                    <div onClick={onClose} className='ef-dialog-btn'>
                        <Text i18nKey='ISee'>我知道了</Text>
                    </div>
                </div>
            </Box>
        </Dialog>
    );
});

// 钻石球不足
export const NotBallDialog = memo((props: IBetDialog) => {
    const { open, onClose } = useErrorFreeCardDialog(props);
    const { data } = api.guessGifts({});
    return (
        <Dialog open={open} showMask maskClosable className={'Insufficient-ball'}>
            <Box type={2} className='ef-dialog'>
                <div className='ef-dialog-title'>
                    <Text i18nKey='InsufficientDiamondBalls'>剩余钻石球不足</Text>
                </div>
                <div className='ef-dialog-tip'>
                    <Text i18nKey='GiveTheAnchorTheFollowingGifts'>赠送主播以下礼物获取更多钻石球</Text>
                </div>
                <div className='ef-dialog-content'>
                    {data?.map((item: any) => (
                        <div className='ball-item' key={item.giftId}>
                            <div className='ball-icon'>
                                <Img className='ball-icon-img' src={item.picUrl} />
                            </div>
                            <div className='ball-name'>{item.name}</div>
                        </div>
                    ))}
                </div>
                <div className='ef-dialog-footer'>
                    <div onClick={onClose} className='ef-dialog-btn'>
                        <Text i18nKey='ISee'>我知道了</Text>
                    </div>
                </div>
            </Box>
        </Dialog>
    );
});
