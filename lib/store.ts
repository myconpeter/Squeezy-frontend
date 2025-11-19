// app/lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import BaseApi from './api/baseApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [BaseApi.reducerPath]: BaseApi.reducer,
      // Add other reducers here if needed (like slices for local state)
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(BaseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
