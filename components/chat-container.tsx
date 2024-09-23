"use client";

import React, { MouseEventHandler } from "react";

import MessageBox from "@/components/messagebox";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  useGetChatByIdQuery,
  useRemoveChatMutation,
} from "@/store/api/inboxApi";
import { useUser } from "@/hooks/useUser";
import { useErrorRedirect } from "@/hooks/useErrorRedirect";
import { formatDate } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

export default function ChatContainer({
  chat_id,
}: {
  chat_id: string | string[];
}) {
  const chat = useGetChatByIdQuery(chat_id);
  const [remove, { isLoading, error }] = useRemoveChatMutation();
  const { id } = useUser();
  const router = useRouter();
  function checkAddresser(user_id: number | bigint) {
    return user_id === id ? "sent" : "received";
  }

  useErrorRedirect(chat.error);

  async function deleteChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await remove(chat_id);
    if (!error) {
      router.push("/inbox");
    }
  }

  return (
    <div className="w-2/3 relative h-full flex flex-col items-start justify-end py">
      <button className="absolute right-0 top-0" onClick={deleteChat}>
        delete
      </button>
      {isLoading || chat.isLoading ? (
        <Spinner />
      ) : (
        <ChatMessageList>
          {chat.data?.map((message) => {
            return (
              <ChatBubble
                variant={checkAddresser(message.user_id)}
                key={message.id}
              >
                <ChatBubbleAvatar fallback="C" />
                <div className="flex flex-col">
                  <ChatBubbleMessage variant={checkAddresser(message?.user_id)}>
                    {message.text}
                  </ChatBubbleMessage>
                  <span className="text-xs text-gray-500 mt-1 self-end">
                    {formatDate(message.createdAt)}{" "}
                  </span>
                </div>
              </ChatBubble>
            );
          })}
        </ChatMessageList>
      )}
      <MessageBox style={{ width: "100%" }} />
    </div>
  );
}
