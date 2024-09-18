import { IConversation } from "@/types";
import { baseApi } from "./api";

export const inboxApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUserConversations: create.query<IConversation[], any>({
      query: (id) => {
        return {
          url: "/tg/conversations",
          params: { user_id: id },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserConversationsQuery } = inboxApi;
