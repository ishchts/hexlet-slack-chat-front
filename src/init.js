import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/app.jsx';
import store from './store/index.js';
import './i18n.js';

export const init = async (socket) => (
  <Provider store={store}>
    <Router>
      <App socket={socket} />
    </Router>
  </Provider>
);

export default init;
