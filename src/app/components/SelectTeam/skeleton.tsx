import React from 'react';
import NewSkeleton from '@Components/newSkeleton';

const SelectTeamSkeleton = () => {
    return (
        <div className='skeleton-bg'>
            <div
                style={{
                    display: 'flex',
                    padding: '2vw 0',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                }}>
                <NewSkeleton height='8vw' width='30vw' />
                <NewSkeleton height='8vw' width='30vw' />
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '2vw 0',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                }}>
                <NewSkeleton height='8vw' width='30vw' />
                <NewSkeleton height='8vw' width='30vw' />
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '2vw 0',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                }}>
                <NewSkeleton height='8vw' width='30vw' />
                <NewSkeleton height='8vw' width='30vw' />
            </div>
        </div>
    );
};

export default SelectTeamSkeleton;
