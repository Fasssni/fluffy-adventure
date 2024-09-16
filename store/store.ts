import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseApi } from './api/api';


export const store = configureStore({
    reducer: {
       [baseApi.reducerPath]:baseApi.reducer, 
    },
    middleware:(getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(
       [ baseApi.middleware, authApi.middleware]
      ),
  });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;