import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import deDE from 'antd/es/locale/de_DE';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

require('dotenv').config();

ReactDOM.render(
  <ConfigProvider locale={deDE} >
    <App />
  </ConfigProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
