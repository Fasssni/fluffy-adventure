"use client";

import React from "react";

import MessageBox from "@/components/messagebox";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useGetChatByIdQuery } from "@/store/api/inboxApi";
import { useAppSelector } from "@/store/store";
import { useUser } from "@/hooks/useUser";

export default function ChatContainer({
  chat_id,
}: {
  chat_id: string | string[];
}) {
  const { data } = useGetChatByIdQuery(chat_id);
  const { id } = useUser();
  console.log(id, "id");
  const ta = useAppSelector((state) => state.user);
  console.log(ta, "ta");
  function checkAddresser(user_id: number | bigint) {
    return user_id === id ? "sent" : "received";
  }

  return (
    <div className="w-2/3 relative h-full flex flex-col items-start justify-end py">
      <ChatMessageList>
        {data?.map((message) => {
          return (
            <ChatBubble
              variant={checkAddresser(message.user_id)}
              key={message.id}
            >
              <ChatBubbleAvatar fallback="C" />
              <ChatBubbleMessage variant="sent">
                {message.text}
              </ChatBubbleMessage>
            </ChatBubble>
          );
        })}
      </ChatMessageList>
      <MessageBox style={{ width: "100%" }} />
    </div>
  );
}

// <ChatBubble variant="received">
// <ChatBubbleAvatar fallback="AI" />
// <ChatBubbleMessage variant="received">
//   Hi, I am doing well, thank you for asking. How can I help you today?
// </ChatBubbleMessage>
// </ChatBubble>
// <ChatBubble variant="received">
// <ChatBubbleAvatar fallback="AI" />
// <ChatBubbleMessage isLoading />
// </ChatBubble>
