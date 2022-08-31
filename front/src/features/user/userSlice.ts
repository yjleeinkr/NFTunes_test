import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';

export const joinAsync = createAsyncThunk('user/join', async (userInfo: IUserInfo) => {
  const response: AxiosResponse = await axios.post('http://localhost:4000/api/user/join', { userInfo });
  return response.data;
});

export const loginAsync = createAsyncThunk('user/login', async (account: string) => {
  const response: AxiosResponse = await axios.post('http://localhost:4000/api/user/login', { account });
  return response.data;
});

export const checkNickAsync = createAsyncThunk('form/check', async (nickname: string) => {
  const response: AxiosResponse = await axios.get('http://localhost:4000/api/user/getAllUserNick');
  const isValidNick = response.data.every((existedNick: string) => existedNick !== nickname);
  return isValidNick;
});

export const modifyProfile = createAsyncThunk('form/modify', async (account: string) => {
  // const response: AxiosResponse
});

export const initialState: UserState = {
  userInfo: {
    _id: '',
    account: '',
    nickname: '',
    email: '',
    avatar: '',
    subscribeTimestamp: null,
    subscribeState: false,
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
      state.userInfo.avatar = '';
      state.userInfo.subscribeTimestamp = null;
      state.userInfo.subscribeState = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.isNew === 'true') {
          state.isNew = 'false';
          state.isLogin = true;
          state.userInfo = action.payload.userInfo;
          state.isLoading = false;
        } else {
          state.isLogin = true;
          state.userInfo = action.payload.userInfo;
          state.isLoading = false;
        }
      })
      .addCase(joinAsync.pending, (state) => {
        state.isLoading = true;
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
        state.userInfo.avatar = '';
      });
  },
});

export const { logout } = userSlice.actions;
export const userState = (state: AppState) => state.user;
export default userSlice.reducer;
