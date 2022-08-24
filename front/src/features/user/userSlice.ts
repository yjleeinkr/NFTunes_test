import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';

export const joinAsync = createAsyncThunk('user/join', async (userInfo: IUserInfo) => {
  const response: AxiosResponse = await axios.post('/api/user/join', { userInfo });
  return response.data;
});

export const loginAsync = createAsyncThunk('user/login', async (account: string) => {
  const response: AxiosResponse = await axios.post('/api/user/login', { account });
  console.log(response, '데이터');
  if (response.data.name === 'AxiosError') return;
  return response.data;
});

const initialState: UserState = {
  userInfo: {
    account: '',
    nickname: '',
    email: '',
  },
  isNew: true,
  isLogin: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinAsync.fulfilled, (state, action) => {
        if (action.payload.isNew) {
          state.isNew = true;
          state.userInfo = action.payload.user;
        } else {
          state.isNew = false;
          state.userInfo = action.payload.user;
        }
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload) {
          console.log(action.payload);
        } else {
          state.isLoading = false;
        }
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const userState = (state: AppState) => state.user;
export default userSlice.reducer;
