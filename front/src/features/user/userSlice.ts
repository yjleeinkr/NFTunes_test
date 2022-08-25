import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';

export const joinAsync = createAsyncThunk('user/join', async (userInfo: IUserInfo) => {
  const response: AxiosResponse = await axios.post('/api/user/join', { userInfo });
  return response.data;
});

export const loginAsync = createAsyncThunk('user/login', async (account: string) => {
  const response: AxiosResponse = await axios.post('/api/user/login', { account });
  console.log('리스폰스 데이터', response.data);
  return response.data;
});

const initialState: UserState = {
  userInfo: {
    _id: '',
    account: '',
    nickname: '',
    email: '',
  },
  isNew: 'untracked',
  isLogin: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.isNew = 'untracked';
      state.userInfo._id = undefined;
      state.userInfo.account = '';
      state.userInfo.email = '';
      state.userInfo.nickname = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinAsync.fulfilled, (state, action) => {
        if (action.payload.isNew === 'true') {
          state.isNew = 'false';
          state.isLogin = true;
          state.userInfo = action.payload.user;
        } else {
          state.isNew = 'untracked';
          state.isLogin = true;
          state.userInfo = action.payload.user;
        }
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isNew = 'false';
        state.isLogin = true;
        state.userInfo = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        state.isNew = 'true';
        state.userInfo._id = undefined;
        state.userInfo.account = '';
        state.userInfo.email = '';
        state.userInfo.nickname = '';
      });
  },
});

export const { logout } = userSlice.actions;
export const userState = (state: AppState) => state.user;
export default userSlice.reducer;
