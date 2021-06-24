import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';
import { getChatData } from './action.js';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isLoading: false,
    data: {
      currentChannelId: null,
      channels: [],
      messages: [],
    },
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => set(state, 'data.currentChannelId', payload),
  },
  extraReducers: (builder) => {
    builder.addCase(getChatData.pending, (state) => ({ ...state, isLoading: true }));

    builder.addCase(getChatData.fulfilled, (
      state,
      { payload },
    ) => ({ ...state, isLoading: false, data: payload }));

    builder.addCase(getChatData.rejected, (state) => ({ ...state, isLoading: false }));
  },
});

export const { setCurrentChannel } = chatSlice.actions;
export default chatSlice.reducer;