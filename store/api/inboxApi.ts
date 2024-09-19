import { IConversation, IMessage } from "@/types";
import { baseApi } from "./api";
import { getUser } from "../helpers";

export const inboxApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUserConversations: create.query<IConversation[], void>({
      query: () => {
        return {
          url: "/tg/conversations",
          credentials: "include",
        };
      },
    }),
    getChatById: create.query<IMessage[], string | string[]>({
      query: (id) => {
        return { url: `/tg/getchat/${id}`, credentials: "include" };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserConversationsQuery, useGetChatByIdQuery } = inboxApi;
