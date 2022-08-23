import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

interface IProps {}

interface IState {
    open?: boolean;
    content?: string;
    callback?: () => void;
}

class ToastBox extends Component<IProps, IState> {
    status: boolean = true;

    constructor(props) {
        super(props);
        this.state = {
            open: false, // 是否显示提示框
            content: '', // 提示内容
            callback: () => {},
        };
    }

    // 打开提示框
    // eslint-disable-next-line react/no-unused-class-component-methods
    public open(options: IState) {
        if (!options.content) {
            return;
        }
        if (!this.status) return;
        const tempOp = options || {};
        tempOp.open = true;
        this.status = false;

        this.setState(
            {
                ...tempOp,
            },
            () => {
                const { callback } = this.state;
                setTimeout(() => {
                    this.close();
                    this.status = true;
                    if (callback) {
                        callback();
                    }
                }, 1000);
            }
        );
    }

    close() {
        this.setState({
            open: false,
        });
    }

    render() {
        const opts: any = this.state;
        if (!opts.open) {
            return '';
        }
        return (
            <p className="toast-content">{opts.content}</p>
            // {
            //   opts.open && <p className="toast-content">{opts.content}</p>
            // }
        );
    }
}

const div = document.createElement('div');
document.body.appendChild(div);
// eslint-disable-next-line react/no-render-return-value
export const Toast: any = ReactDOM.render(<ToastBox />, div);
