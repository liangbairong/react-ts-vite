import React from 'react';

type IProps = {};

type IState = {
    hasError?: Boolean;
};

class ErrorBoundary extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state.tsx 使下一次渲染能够显示降级后的 UI
        if (error) {
            console.log(error);
            return { hasError: true };
        }
    }

    // componentDidCatch(error, errorInfo) {
    //   // 你同样可以将错误日志上报给服务器
    //   logErrorToMyService(error, errorInfo);
    // }

    render() {
        const { hasError } = this.state;

        const { children } = this.props;

        if (hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;
