import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import './index.scss';

type IProgress = {
    children?: React.ReactNode;
    all?: number;
    have?: number;
    loadFn?: () => void;
};

export const Progress: FC<IProgress> = observer(
    ({ children, all = 100, have = 90, loadFn = () => {} }: IProgress): JSX.Element => {
        const [percentage, setPercentage] = useState(0);
        useEffect(() => {
            setPercentage((have / all) * 100);
        }, [have, all]);

        return (
            <div className="progress" style={{}}>
                <div className="progress-content" style={{ width: `${percentage}%` }} />
                <div className="progress-children">{children}</div>
            </div>
        );
    }
);
