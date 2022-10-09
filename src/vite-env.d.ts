/// <reference types="vite/client" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module '*.svga';

declare namespace JSX {
    // interface IntrinsicElements {
    //     'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
    // }
}

// @ts-ignore
declare const process: {
    env: {
        NODE_ENV: 'dev' | 'preprod' | 'prod';
        [key: string]: any;
    };
};

declare interface Window {
    webkit: any;
    YWJSBridge: any;
    Image: {
        prototype: HTMLImageElement;
        new (): HTMLImageElement;
    };
    appPendantMsg: any;
    RedEventEmitter: any;
    ROOT_BASE: string;
    HTTP_BASE: string;
    i18n: any;
    getAppHeaderInfo_callBack: (data: string) => void;
    getUserInfo_callBack: (data: string) => void;
    appSystemInfo_callBack: (data: string) => void;
    getAppPendantInfo_callBack: (data: string) => void;
}

declare interface Document {
    mozHidden?: any;
    msHidden?: any;
    webkitHidden?: any;
}

// global const
declare const APP_ENV: string;
declare const CDN_BASE: string;
declare const HTTP_BASE: string;
declare const ROOT_BASE: string;
declare const JSBridge: any;
declare const YWJSBridge: any;

declare const React: typeof import('react');
