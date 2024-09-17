import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { baseApi } from "./api/api";

import authReducer from "./features/auth/authSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
