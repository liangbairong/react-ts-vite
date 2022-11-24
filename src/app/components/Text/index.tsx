import React, { FC, useEffect, useState } from 'react';
import reactI18n from 'min-react-i18n';

/**
 * i18nKey: 必须，国际化key
 * options：非必须，国际化参数
 */
interface TextProps {
    i18nKey: string;
    options?: Record<string, any>;
    className?: string;
    children?: string | React.ReactNode;
}
const Text: FC<TextProps> = ({ i18nKey, options = {}, className = '', children = '' }: TextProps): JSX.Element => {
    const [html, setHtml] = useState<any>('');
    useEffect(() => {
        setHtml(reactI18n.get(i18nKey, options) || children);
    }, [i18nKey, options]);
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Text;
