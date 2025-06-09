import { configureStore } from '@reduxjs/toolkit';
// import your reducers here
// import counterReducer from './features/counterSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
