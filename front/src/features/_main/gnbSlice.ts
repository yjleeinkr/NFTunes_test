import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../modules/store'

interface gnbState {
  status: '-top-0' | '-top-full'
}

const initialState: gnbState = {
  status: '-top-full'
}

export const gnbSlice = createSlice({
  name: 'gnb',
  initialState,
  reducers: {
    handleGnb: (state)=>{
      if (state.status !== '-top-0') {
        state.status = '-top-0'
      } else {
        state.status = '-top-full'
      }
    },
  }
})

export const { handleGnb } = gnbSlice.actions

export const gnbCount = (state: AppState) => state.gnb.status

export default gnbSlice.reducer
