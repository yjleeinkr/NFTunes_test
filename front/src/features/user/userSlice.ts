import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';

export const joinAsync = createAsyncThunk('user/join', async (userInfo: IUserInfo) => {
  const response: AxiosResponse = await axios.post('/api/user', { userInfo });
  return response.data;
});

const initialState: UserState = {
  userInfo: {
    account: '',
    nickname: '',
    email: '',
  },
  isNew: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(joinAsync.fulfilled, (state, action) => {
      if (action.payload.isNew) {
        state.isNew = true;
        state.userInfo = action.payload.user;
      } else {
        state.isNew = false;
        state.userInfo = action.payload.user;
      }
    });
  },
});

export const userState = (state: AppState) => state.user;
export default userSlice.reducer;
