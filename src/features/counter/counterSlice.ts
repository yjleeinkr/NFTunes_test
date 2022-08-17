import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../modules/store'
import { fetchCount } from './counterAPI'

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
}

// Thunk 설정 출처 : https://velog.io/@raejoonee/createAsyncThunk
// createAsyncThunk 의 파라미터 3개: 액션 타입 문자열, 프로미스를 반환하는 비동기 함수, 추가옵션
export const incrementAsync = createAsyncThunk(
  // 액션 타입 문자열 : 이 값에 따라 pending, fulfilled, rejected 가 붙은 액션 타입이 생성된다.
  'counter/fetchCount',
  // 프로미스를 반환하는 비동기 함수: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
  async (amount: number) => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
  // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
  // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
  // dispatchConditionRejection: boolean (true 면, condition()이 false 를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
  // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
)

// 리듀서 제작을 여기서부터 시작.
// createSlice 에 action 설정도 들어간다 생각하면 됨.
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  // 이 reducers 속성에 적히면 'reducer' 가 만들어짐. ( 이 예제에선 총 3개 )
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  // extraReducers 는 Thunk 사용을 위해 적음.
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value += action.payload
      })
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Thunk 사용 예시
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: AppState) => state.counter.value

// 곧 미들웨어 처럼 사용된다.!!
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount: number): AppThunk => (
  dispatch,
  getState
) => {
  const currentValue = selectCount(getState())
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount))
  }
}

export default counterSlice.reducer
