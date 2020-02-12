import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import * as serviceWorker from './serviceWorker';

import './index.scss';

if (process.env.NODE_ENV === 'prod') {
  serviceWorker.registerWs();
} else {
  serviceWorker.unregisterWs();
}

ReactDOM.render(<App />, document.getElementById('root'));
