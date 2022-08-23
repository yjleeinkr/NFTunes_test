import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../modules/store'

interface wheelState {
  value: number
}

const initialState: wheelState = {
  value: -1,
}

export const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    scrollMouse: (state, action: PayloadAction<number>)=>{
      state.value = action.payload
    },
  }
})

export const { scrollMouse } = wheelSlice.actions

export const selectWheel= (state: AppState) => state.wheel.value

export default wheelSlice.reducer
