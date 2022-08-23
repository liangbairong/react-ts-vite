import React from 'react';
import Skeleton from 'elelive-ui/es/Components/Skeleton';

type IDialog = {};

const IndexSkeleton: React.FC<IDialog> = (): JSX.Element => {

    return (
        <div
            className='skeleton-bg'
        >
            <div style={{display: 'flex', padding: '20px 32px'}}>
                <Skeleton height={48} width={150}/>
                <Skeleton height={48} width={150} style={{marginLeft: '22px'}}/>
            </div>
            <Skeleton height={300} width={750}/>
            <div style={{display: 'flex', padding: '20px 0',  justifyContent: 'center',}}>
                <Skeleton height={332} width="332px"/>
                <Skeleton height={332} width="332px" style={{marginLeft: '22px'}}/>
            </div>
            <div style={{textAlign: 'left', padding: '0px 32px 0px 32px'}}>
                <Skeleton height={46} width="250px"/>
            </div>
            <div style={{display: 'flex', padding: '20px 32px', justifyContent: 'center',}}>
                {[1, 2, 3, 4].map((_item, i) => {
                    return (
                        <div key={i} style={{marginLeft: i === 0 ? '0px' : '80px'}}>
                            <Skeleton height={96} width={96} style={{marginBottom: '20px'}}/>
                            <Skeleton height={40} width={96}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IndexSkeleton;
