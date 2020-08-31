import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { unregister } from './serviceWorker';
import App from "./App"

unregister();

ReactDOM.render(
    <React.StrictMode>
            <App />
  </React.StrictMode>,
  document.getElementById('root')
);





