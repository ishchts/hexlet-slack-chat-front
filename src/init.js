import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Rollbar from 'rollbar';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './app/app.jsx';
import store from './store/index.js';
import './i18n.js';

const rollbarConfig = {
  accessToken: '4be9d205911447faab8069536e5d5cc9',
  environment: 'production',
};

const rollbar = new Rollbar(rollbarConfig);

export const init = async (socket) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <Router>
      <RollbarProvider instance={rollbar}>
        <ErrorBoundary>
          <App socket={socket} />
        </ErrorBoundary>
      </RollbarProvider>
    </Router>
  </Provider>
);

export default init;
