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

ReactDOM.render(<App/>, document.getElementById('app'));
