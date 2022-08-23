import React, { EventHandler, FC, useEffect, memo, useRef } from 'react';

import moment from 'moment';

import classNames from 'classnames';

import { Text } from '@Components/index';

import { IRoundInfos } from '@Stores/starStore';

import './index.scss';

interface StepsProps<T extends IRoundInfos = IRoundInfos> {
    stepsArr: T[];
    handStepIndex: EventHandler<any>; // 更新后的step index传递给父组件
    type?: string;
}

interface RenderInfoType {
    index: number;
}

// eslint-disable-next-line react/display-name
export const Steps: FC<StepsProps> = memo(
    ({ stepsArr = [], handStepIndex = () => {}, type = 'star' }: StepsProps): JSX.Element => {
        const [activeStep, setActiveStep] = React.useState(-1);
        const containerRef: any = useRef(null);
        useEffect(() => {
            /* 拿数据中state = 1的下标 */
            const stepIndex = stepsArr.findIndex((item) => item.state === 1 || item.state === 5);
            const len = stepsArr.length;
            let cur_tab = stepIndex
            /* 如果已结束，index为最后一个元素的下标 */
            if (stepsArr[len - 1].state === 2) {
                cur_tab = len - 1
            }
            // if (stepsArr[len - 1].state === 2) {
            //     cur_tab = len - 1
            //     setActiveStep(len - 1);
            // } else {
            //     /* 如果未开始，index为-1 */
            //     setActiveStep(stepIndex);
            // }
            setActiveStep(cur_tab)
            setTimeout(() => {
                if (cur_tab >= 5) {
                    containerRef.current.scrollTo(cur_tab * 119, 0);
                } else {
                    containerRef.current.scrollTo(0, 0);
                }
            }, 0);
        }, [stepsArr]);

        const handStepClick = (item, index) => {
            if (activeStep === index || item.state === 0) {
                return;
            }
            // /* 切换当前index */
            setActiveStep(index);

            // /* 传递当前roundId到父组件 */
            handStepIndex(item);
        };

        const getStepStatus = (state) => {
            switch (state) {
                case 0:
                    return 'disabled';
                default:
                    return 'completed';
            }
        };

        const time = 24 * 60 * 60 * 1000;

        return (
            <div className={type === 'anchor' ? 'star-steps' : 'everyday-steps'}>
                <ul className="steps-ul" ref={containerRef}>
                    {stepsArr.map((item: IRoundInfos, index) => {
                        const { endDate = 0, roundId = 0, startDate = 0, state = 0 } = item;
                        return (
                            <li
                                aria-hidden="true"
                                key={index}
                                className={classNames(
                                    'steps-li',
                                    getStepStatus(state),
                                    index === activeStep ? 'active' : '',
                                    state === 1 || state === 5 ? 'steps-li-noprogress' : ''
                                )}
                                onClick={() => handStepClick(item, index)}
                            >
                                {type === 'anchor' && (
                                    <>
                                        <span className="star-steps-date">
                                            {endDate - startDate > time
                                                ? `${moment(startDate)
                                                      .utcOffset(+8)
                                                      .format('M.D')}-${moment(endDate - time)
                                                      .utcOffset(+8)
                                                      .format('M.D')}`
                                                : moment(startDate)
                                                      .utcOffset(+8)
                                                      .format('M.D')}
                                        </span>
                                    </>
                                )}
                                {type === 'user' && (
                                    <span className="star-steps-date">
                                        {moment(startDate)
                                            .utcOffset(+8)
                                            .format('M.D')}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
);
