import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app.jsx';

export const init = async () => (
  <Router>
    <App />
  </Router>
);

export default init;
