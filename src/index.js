// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import init from './init.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init().then((result) => render(result, document.getElementById('chat')));
