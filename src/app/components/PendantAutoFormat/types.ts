import React from 'react';
import { CustomAxiosResponse, requestConfig } from '@Lib/request';

export interface ImResponse<T extends CustomAxiosResponse = CustomAxiosResponse> {
    id: string;
    bizKey: string;
    groupType: string;
    resource: T;
    androidAppVersion: string;
    subType: string;
    userId: number | string | null;
    eventTime: number;
    endTime: number;
    currentTime: number;
    anchorId: number | string | null;
    startTime: number;
    iosAppVersion: string;
}

export interface InitData {
    status: number;
    pageSource: number;
    position: number;
    endTime: number;
    height: number;
    width: number;
    pendantName: string;
    tag: number;
    startTime: number;
    url: string;
}

export interface InitResponse extends CustomAxiosResponse {
    data: InitData;
}

export interface callback {
    initData: InitData;
    formatData: ImResponse;
}

export interface IPendantAutoFormat {
    pendantKey?: string;
    requestConfig?: requestConfig;
    children?: React.ReactNode;
    callback?: (data: callback) => void;
}
