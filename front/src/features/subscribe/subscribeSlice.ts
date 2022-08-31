import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';

export const subscribeAsync = createAsyncThunk('user/subscribe', async (account: string) => {
  const response: AxiosResponse = await axios.post('http://localhost:4000/subscribe', { account });
  return response.data;
});

// export const checkNickAsync = createAsyncThunk('form/check', async (nickname: string) => {
//   const response: AxiosResponse = await axios.get('http://localhost:4000/api/user/getAllUserNick');
//   const isValidNick = response.data.every((existedNick: string) => existedNick !== nickname);
//   return isValidNick;
// });

// const initialState: UserState = {
//   userInfo: {
//     _id: '',
//     account: '',
//     nickname: '',
//     email: '',
//     avatar: '',
//   },
//   isNew: 'untracked',
//   isLogin: false,
//   isLoading: false,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.isLogin = false;
//       state.isNew = 'untracked';
//       state.userInfo._id = undefined;
//       state.userInfo.account = '';
//       state.userInfo.email = '';
//       state.userInfo.nickname = '';
//       state.userInfo.avatar = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(subscribeAsync.fulfilled, (state, action) => {
//         console.log(action.payload);
//         if (action.payload.isNew === 'true') {
//           state.isNew = 'false';
//           state.isLogin = true;
//           state.userInfo = action.payload.userInfo;
//           state.isLoading = false;
//         } else {
//           state.isLogin = true;
//           state.userInfo = action.payload.userInfo;
//           state.isLoading = false;
//         }
//       })
//       .addCase(subscribeAsync.pending, (state) => {
//         state.isLoading = true;
//       });
//   },
// });

// export const userState = (state: AppState) => state.user;
// export default userSlice.reducer;
