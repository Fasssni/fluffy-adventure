import { ILogin, ILoginResponse } from "@/types";
import { baseApi } from "./api";
import { setUser } from "../features/userSlice";
import { setIsAuthorized } from "../features/auth/authSlice";
import { getUser } from "../helpers";

export const authApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    registerUser: create.mutation<ILoginResponse, ILogin>({
      query: (data) => ({
        url: "/apiv/register",
        method: "POST",
        body: data,
        withCredentials: "include",
      }),
    }),
    login: create.mutation<ILoginResponse, ILogin>({
      query: (data) => {
        return {
          url: "/apiv/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      onQueryStarted: getUser,
    }),
    checkauth: create.query<any, void>({
      query: () => ({ url: "/apiv/checkauth", credentials: "include" }),
      onQueryStarted: getUser,
    }),
  }),

  overrideExisting: true,
});

export const { useRegisterUserMutation, useLoginMutation, useCheckauthQuery } =
  authApi;
