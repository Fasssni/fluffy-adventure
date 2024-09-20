import { ChannelType, IConversation, IMessage, TemplatesType } from "@/types";
import { baseApi } from "./api";
import { SendMessageBodyType } from "./types";

export const inboxApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUserConversations: create.query<IConversation[], void>({
      query: () => {
        return {
          url: "/tg/conversations",
        };
      },
    }),
    getChatById: create.query<IMessage[], string | string[]>({
      query: (id) => {
        return { url: `/tg/getchat/${id}` };
      },
    }),
    sendMessage: create.mutation<void, SendMessageBodyType>({
      query: ({ id, body }) => {
        return {
          url: "/tg/sendmessage",
          method: "POST",
          body,
          params: {
            id,
          },
        };
      },
    }),
    getChannels: create.query<ChannelType[], number | null>({
      query: (user_id) => {
        return {
          url: "/apiv/getchannels",
          params: { id: user_id },
        };
      },
    }),
    getTemplates: create.query<TemplatesType[], number>({
      query: (channelId: number) => {
        return {
          url: `/tg/gettemplates/${channelId}`,
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetUserConversationsQuery,
  useGetChatByIdQuery,
  useSendMessageMutation,
  useGetChannelsQuery,
  useGetTemplatesQuery,
} = inboxApi;
