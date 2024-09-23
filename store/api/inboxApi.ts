import {
  ChannelType,
  IConversation,
  IMessage,
  TemplateBodyType,
  TemplatesType,
} from "@/types";
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Conv" as const, id })),
              { type: "Conv", id: "LIST" },
            ]
          : ["Conv"],
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Bot" as const, id })),
              { type: "Bot", id: "LIST" },
            ]
          : ["Bot"],
    }),
    getTemplates: create.query<TemplatesType[], number>({
      query: (channelId: number) => {
        return {
          url: `/tg/gettemplates/${channelId}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Templates" as const, id })),
              { type: "Templates", id: "LIST" },
            ]
          : ["Templates"],
    }),
    addTemplate: create.mutation<TemplatesType, TemplateBodyType>({
      query: (templateData) => {
        return {
          method: "POST",
          url: "/tg/addtemplate",
          body: templateData,
        };
      },
      invalidatesTags: [{ type: "Templates", id: "LIST" }],
    }),
    createTgBot: create.mutation<
      any,
      { user_id: number | null; token: string; greeting: string }
    >({
      query: ({ user_id, token, greeting }) => {
        return {
          url: "/tg/createbot",
          method: "POST",
          params: { user_id },
          body: { token, greeting },
        };
      },
      invalidatesTags: [{ type: "Bot", id: "LIST" }],
    }),
    removeChat: create.mutation<any, string | string[]>({
      query: (conv_id) => {
        return {
          url: "/tg/removechat",
          method: "DELETE",
          params: { conv_id },
        };
      },
      invalidatesTags: [{ type: "Conv", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserConversationsQuery,
  useGetChatByIdQuery,
  useSendMessageMutation,
  useGetChannelsQuery,
  useGetTemplatesQuery,
  useAddTemplateMutation,
  useCreateTgBotMutation,
  useRemoveChatMutation,
} = inboxApi;
