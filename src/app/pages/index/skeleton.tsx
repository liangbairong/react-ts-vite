import React from 'react';
import NewSkeleton from '@Components/newSkeleton';
import appStore from '../../stores/appStore';
import { pxToVw } from '../../utils';

const IndexSkeleton = () => {
    const {
        appHeaderInfo: { statusBarHeight },
    } = appStore;
    return (
        <div className='skeleton-bg' style={{ paddingTop: `${pxToVw(statusBarHeight)}px` }}>
            <div
                style={{
                    display: 'flex',
                    padding: '2vw 0',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}>
                <div>
                    <NewSkeleton height='5vw' width='40vw' />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '2vw 0',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}>
                <div>
                    <NewSkeleton height='30vw' width='90vw' />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '1vw 5vw',
                    // justifyContent: 'center',
                    // textAlign: 'center',
                }}>
                <div>
                    <NewSkeleton height='5vw' width='30vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='30vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '1vw 5vw',
                }}>
                <div>
                    <NewSkeleton height='5vw' width='30vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='20vw' width='90vw' style={{ marginBottom: '2vw' }} />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    padding: '1vw 5vw',
                    // justifyContent: 'center',
                    // textAlign: 'center',
                }}>
                <div>
                    <NewSkeleton height='5vw' width='30vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='30vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                    <NewSkeleton height='5vw' width='90vw' style={{ marginBottom: '2vw' }} />
                </div>
            </div>
        </div>
    );
};

export default IndexSkeleton;
