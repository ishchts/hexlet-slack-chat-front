import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './feature/chat/chat-slice.js';

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
