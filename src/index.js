// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import Rollbar from 'rollbar';
import '../assets/application.scss';
import { render } from 'react-dom';
import runApp from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

runApp().then((result) => {
  render(result, document.getElementById('chat'));
  new Rollbar({
    accessToken: '4be9d205911447faab8069536e5d5cc9',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
});
