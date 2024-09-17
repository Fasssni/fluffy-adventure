import { ILogin } from "@/types";
import { baseApi } from "./api";
import { setUser } from "../features/userSlice";
import { setIsAuthorized } from "../features/auth/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    registerUser: create.mutation<ILogin, unknown>({
      query: (data) => ({
        url: "/apiv/register",
        method: "POST",
        body: data,
        withCredentials: "include",
      }),
    }),
    login: create.mutation<void, ILogin>({
      query: (data) => {
        return {
          url: "/apiv/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    checkauth: create.query({
      query: () => ({ url: "/apiv/checkauth", credentials: "include" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setUser(data));
          dispatch(setIsAuthorized(!!data));
        } catch (err) {
          console.log(err);
          dispatch(setIsAuthorized(false));
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const { useRegisterUserMutation, useLoginMutation, useCheckauthQuery } =
  authApi;
