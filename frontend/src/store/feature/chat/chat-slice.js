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
    addMessage: (state, action) => {
      state.data.messages.push(action.payload);
    },
    addChannel: (state, { payload }) => {
      state.data.channels.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const newChannels = state.data.channels.map((el) => {
        if (el.id === payload.id) {
          return { ...el, name: payload.name };
        }

        return el;
      });

      return set(state, 'data.channels', newChannels);
    },
    removeChannel: (state, { payload: { channelId } }) => {
      const id = Number(channelId);
      return {
        ...state,
        data: {
          ...state.data,
          channels: state.data.channels.filter((el) => el.id !== id),
          messages: state.data.messages.filter((el) => el.channelId !== id),
          currentChannelId: state.data.currentChannelId === id ? 1 : state.data.currentChannelId,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatData.pending, (state) => ({ ...state, isLoading: true }));

    builder.addCase(getChatData.fulfilled, (
      state,
      { payload },
    ) => ({
      ...state,
      isLoading: false,
      data: {
        ...state.data,
        channels: payload.channels,
        messages: payload.messages,
        currentChannelId: state?.data?.currentChannelId || payload.currentChannelId,
      },
    }));

    builder.addCase(getChatData.rejected, (state) => ({ ...state, isLoading: false }));
  },
});

export const {
  setCurrentChannel, addMessage, addChannel, renameChannel, removeChannel,
} = chatSlice.actions;
export default chatSlice.reducer;
