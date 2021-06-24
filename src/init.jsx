import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/app.jsx';
import store from './store';

export const init = async () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default init;
