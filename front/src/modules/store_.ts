import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// 각 리듀서 임포트. (기능별로 나눠놓은 features 에서)
import counterReducer from '../features/counter/counterSlice';
import gnbReducer from '../features/_main/gnbSlice';

// automatically combineReducer
const reducer = {
  counter: counterReducer,
  gnb: gnbReducer,
};

// 가져온 리듀서를 createStore() 해줌.
const store = configureStore({
  reducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
