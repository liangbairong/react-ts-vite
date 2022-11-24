export type PandantWrapComponentProps<T> = {
    pendantKey: string;
    children?: React.ReactNode;
    requestConfig: T;
    type?: 'Home' | 'Normal';
    onCallBack: (data: { initData: any; pendantData: any }) => any;
    hideBtnCallBack?: (data: any) => void;
    pendantType?: string; // 区别特殊挂件 normal普通挂件,无数据推送,special特殊挂件,需要推送数据
    showPendant?: number; // 显示隐藏挂件
};

export type PendantMsgResponse = {
    timestamp: number;
    status: number;
    data: PendantMsgInfo[];
};
export type PendantMsgInfo = {
    pendantName: string;
    startTime?: number;
    endTime?: number;
    position?: number;
    sort?: number;
    special?: boolean;
    status?: number;
    thumbnailUrl?: string;
    url?: string;
};

// 挂件数据
export interface PendantDataResponse<T = any> {
    status: number;
    data: T;
    timestamp: number;
    currentTime: number;
    traceId: string | null;
    msg: null | string;
    showPedant?: number;
}
export interface IMPendantData<T = any> {
    id: string;
    bizKey: string;
    groupType: string;
    resource: PendantDataResponse<T>;
    androidAppVersion: string;
    subType: string;
    userId: number | string | null;
    eventTime: number;
    endTime: number;
    currentTime: number;
    anchorId: number | string | null;
    startTime: number;
    iosAppVersion: string;
    allRegion: boolean;
}
