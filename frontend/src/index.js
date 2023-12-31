import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.js';

import './assets/index.scss';

const run = async () => {
  const root = createRoot(document.getElementById('root'));
  const socket = io();
  const vdom = await init(socket);
  root.render(vdom);
};

run();
