import React, { FC, useEffect, useRef, memo, HTMLAttributes } from 'react';

import intl from 'react-intl-universal';

import './index.scss';

interface TextProps {
    i18nKey: string;
    options?: Record<string, any>;
}

/**
 * i18nKey: 必须，国际化key
 * options：非必须，国际化参数
 */

export const Text: FC<TextProps> = memo(
    ({ i18nKey, options = {}, ...props }: TextProps): JSX.Element => (
        // 如果不携带参数，不返回html.如果携带参数，返回html
        <>
            {
                // eslint-disable-next-line no-nested-ternary
                i18nKey
                    ? Object.keys(options).length === 0
                        ? intl.get(i18nKey).d(<span {...props} />)
                        : intl.getHTML(i18nKey, options).d(<span {...props} />)
                    : ''
            }
        </>
    )
);

interface FillTextProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    i18nKey?: string;
    options?: Record<string, any>;
    minSize?: number;
}

/**
 * i18nKey: 必须，国际化key
 * options：非必须，国际化参数
 * minSize：最小字体
 */

export const FillText: FC<FillTextProps> = memo(
    ({ children, i18nKey, options = {}, minSize = 10, ...props }: FillTextProps): JSX.Element => {
        const ref = useRef<any>(null);

        useEffect(() => {
            if (ref.current) {
                const { textContent = '', clientWidth = 0 } = ref.current;
                // 获取子元素内容的长度，不包括html
                const len = textContent.length;
                // 获取当前容器最多能完全显示字体需要设置的字体长度
                const size = clientWidth / len;
                // 获取最终计算的样式
                const defaultStyle = window.getComputedStyle(ref.current);
                // 判断字体是否已比当前的字体大
                if (size < parseInt(defaultStyle.fontSize, 10)) {
                    // 判断字体是否比设置的最小字体小
                    const fontSize = Math.max(size, minSize);
                    // 重新设置样式
                    ref.current.style.fontSize = `${fontSize}px`;
                }
            }
        }, [ref]);

        return (
            // 如果携带了国际化，返回国际化后的文案。如果没有就返回子元素
            <div ref={ref} {...props}>
                {i18nKey ? <Text i18nKey={i18nKey} options={options} /> : children}
            </div>
        );
    }
);
