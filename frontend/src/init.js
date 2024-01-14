import React from 'react';
import { Provider } from 'react-redux';

import store from './store/index.js';
import './i18n.js';
import AuthProvider from './components/HOC/auth-provider.jsx';

import { App } from './app';

const init = async (socket) => (
  <Provider store={store}>
    <AuthProvider>
      <App socket={socket} />
    </AuthProvider>
  </Provider>
);

export default init;
