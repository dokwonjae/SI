import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import { useDispatch } from 'react-redux';
// seting redux-toolkit
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
