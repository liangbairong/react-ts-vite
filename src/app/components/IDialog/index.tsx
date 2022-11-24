import React, { memo, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import Dialog from 'elelive-ui/es/Components/Dialog';

import './index.scss';

export function useToggle(defaultShow?: boolean) {
    const [open, setOpen] = useState<boolean>(defaultShow || false);
    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return {
        show: open,
        onToggle,
    };
}

type IDialogProps = {
    isShow: boolean;
    onToggle?: () => void;
    showCancelBtn?: boolean;
    autoClose?: boolean;
    showMask?: boolean;
    autoCloseTime?: number;
    title?: string | React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    dialogClassName?: string;
};
const IDialog: React.FC<IDialogProps> = ({
    isShow,
    onToggle,
    showCancelBtn = true,
    autoClose = false,
    autoCloseTime = 3000,
    showMask = true,
    title,
    children,
    className,
    dialogClassName = '',
}) => {
    const clearStaticAndCloseDialog = () => {
        if (document.body.classList.contains('static')) {
            document.body.classList.remove('static');
        }
        if (onToggle) {
            onToggle();
        }
    };

    useEffect(() => {
        let tId: NodeJS.Timeout;
        function intiTime() {
            const timeId = setTimeout(() => {
                clearStaticAndCloseDialog();
            }, autoCloseTime);
            return timeId;
        }

        if (isShow && autoClose) {
            tId = intiTime();
        }

        return () => {
            if (tId) {
                clearTimeout(tId);
            }
        };
    }, [isShow, autoClose, autoCloseTime]);

    return (
        <Dialog
            isBescroll
            open={isShow}
            showCloseButton={false}
            showMask={showMask}
            maskClosable
            className={classNames('common-dialog', dialogClassName)}
            onClose={clearStaticAndCloseDialog}>
            <div className='idialog-wrap'>
                {title && <div className='idialog-title'>{title}</div>}
                <div className='idialog-body'>
                    <div className={className}>{children}</div>
                </div>
                {showCancelBtn && <div className='idialog-cancel-btn' onClick={clearStaticAndCloseDialog} />}
            </div>
        </Dialog>
    );
};

export default memo(IDialog);
