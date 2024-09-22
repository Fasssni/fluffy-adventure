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
  }),
});

export const {
  useGetUserConversationsQuery,
  useGetChatByIdQuery,
  useSendMessageMutation,
  useGetChannelsQuery,
  useGetTemplatesQuery,
  useAddTemplateMutation,
} = inboxApi;
