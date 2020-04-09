import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './index.scss';
import * as serviceWorker from './serviceWorker';
serviceWorker.register();

if (process.env.NODE_ENV === 'prod') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}

ReactDOM.render(<App />, document.getElementById('root'));
