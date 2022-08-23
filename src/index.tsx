import React from 'react';

import ReactDOM from 'react-dom';
import 'elelive-ui/es/index-all.min.css'
import Utils from 'elelive-ui/es/Components/Utils';
import App from './app/app';

Utils.supportsWebp(window).then((res) => {
    if (res) {
        document.body.classList.add('webp');
    }
});

// if (APP_ENV !== 'prod') {
//     // eslint-disable-next-line global-require
//     const VConsole = require('vconsole');
//     // eslint-disable-next-line no-new
//     new VConsole();
// }

ReactDOM.render(<App />, document.getElementById('app'));
