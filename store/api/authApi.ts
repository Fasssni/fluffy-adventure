import { ILogin } from "@/types";
import { baseApi } from "./api";

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
  }),
  overrideExisting: true,
});

export const { useRegisterUserMutation, useLoginMutation } = authApi;
