import React from 'react';

import './index.scss';

const NoRecordStatus = React.memo(() => {
    return <div className='status no-record-status' />;
});

const NoStartStatus = React.memo(() => {
    return <div className='status no-start-status' />;
});

const SetlStatus = React.memo(() => {
    return <div className='status no-setl-status' />;
});

const StartFailStatus = React.memo(() => {
    return <div className='status no-fail-status' />;
});

export { NoRecordStatus, NoStartStatus, SetlStatus, StartFailStatus };
