import { createSelector } from '@reduxjs/toolkit';

export const getChat = (state) => state.chat;

export const getChannels = createSelector(
  getChat,
  (store) => (
    store?.data?.channels
  ),
);

export const getChannelNames = createSelector(
  getChannels,
  (store) => (
    store.map((el) => el.name)
  ),
);
