import { IConversation, IMessage } from "@/types";
import { baseApi } from "./api";
import { SendMessageBodyType } from "./types";

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
    sendMessage: create.mutation<void, SendMessageBodyType>({
      query: ({ id, body }) => {
        console.log("triggered1");
        return {
          url: "/tg/sendmessage",
          method: "POST",
          credentials: "include",
          body,
          params: {
            id,
          },
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
} = inboxApi;

// (draft) => {
//   draft.push({
//     id: new Date().getTime(), // Temporarily use timestamp as ID
//     text: body.text, // Assuming `body.text` contains the message text
//     user_id: body.user_id, // Assuming the message sender is in `body.user_id`
//     createdAt: new Date().toISOString(),
//     conversation_id: id, // Add the conversation ID
//   });
