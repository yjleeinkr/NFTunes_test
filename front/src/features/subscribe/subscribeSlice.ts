import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';
import { initialState } from '../user/userSlice';

export const subscribeAsync = createAsyncThunk('user/subscribe', async (account: string) => {
  const response: AxiosResponse = await axios.post('http://localhost:4000/api/subscribe/subscribe', { account });
  console.log('hello', response.data);
  return response.data;
});

// const initialState: IUserInfo = {
//   _id: '',
//   account: '',
//   nickname: '',
//   email: '',
//   avatar: '',
//   subscribeTime: null,
//   subscribeState: false,

//   //   isNew: 'untracked',
//   //   isLogin: false,
//   //   isLoading: false,
// };

export const subSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(subscribeAsync.fulfilled, (state, action) => {
      const { result } = action.payload;
      console.log('result', result);
      state.userInfo.subscribeTimestamp = result.subscribeTimestamp;
      state.userInfo.subscribeState = result.subscribeState;
      console.log('스테', state);
    });
    //   .addCase(subscribeAsync.pending, (state) => {
    //     state.isLoading = true;
    //   });
  },
});

// function now(): Date {
//   throw new Error('Function not implemented.');
// }
export const subState = (state: AppState) => state.user;
export default subSlice.reducer;
