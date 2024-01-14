import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../../services/api-service.js';

export const getChatData = createAsyncThunk('getChatData', async () => {
  const resp = await ApiService.getChatData();
  return resp.data;
});

export default {};
