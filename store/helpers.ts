import { setUser } from "./features/userSlice";
import { setIsAuthorized } from "./features/auth/authSlice";
import { ILoginResponse, IMessage, IUser } from "@/types";
import { userDto } from "@/lib/dto";
import { useAppDispatch } from "./store";
import { inboxApi } from "./api/inboxApi";
import { Dispatch } from "react";

export async function getUser(
  arg: any,
  { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }
) {
  try {
    const { data } = await queryFulfilled;

    await dispatch(setUser(filterUserInfo(data)));
    await dispatch(setIsAuthorized(!!data));
  } catch (err) {
    console.log(err);
    await dispatch(setIsAuthorized(false));
  }
}

const filterUserInfo = (data: ILoginResponse) => {
  if (!data.hasOwnProperty("token")) {
    return data;
  }

  return new userDto(data.user);
};

export function updateStreamedMessages(dispatch: any, message: IMessage) {
  dispatch(
    inboxApi.util.updateQueryData(
      "getChatById",
      message.conversation_id.toString(),
      (draft) => {
        draft.push(message);
      }
    )
  );
  dispatch(
    inboxApi.util.updateQueryData(
      "getUserConversations",
      undefined,
      (draft) => {
        const updatedConversation = draft.find(
          (conv) => conv.id === message.conversation_id
        );
        if (!updatedConversation) {
          return [
            {
              id: message.conversation_id,
              user_id: message.user_id,
              client_name: message.name,
              createdAt: message.createdAt,
              updatedAt: message.updatedAt,
              lastMessage: message,
            },
            ...draft,
          ];
        } ///временно
        return [
          { ...updatedConversation, lastMessage: message },
          ...draft.filter((conv) => conv.id !== updatedConversation.id),
        ];
      }
    )
  );
}
