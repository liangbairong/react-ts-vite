import React from 'react';
import Skeleton from 'elelive-ui/es/Components/Skeleton';

const SkeletonHOC = (WrapComponent: React.ReactNode) => {
    return (props: any) => {
        // @ts-ignore
        return <WrapComponent {...props} />;
    };
};

export default SkeletonHOC(Skeleton);
