"use client";
import React, { memo } from "react";

import { useGetUserConversationsQuery } from "@/store/api/inboxApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useErrorRedirect } from "@/hooks/useErrorRedirect";
import { IConversation } from "@/types";
import { useInboxContext } from "@/context/inbox-context";

export default function ChatList() {
  const { data, error } = useGetUserConversationsQuery();
  const searchParams = useSearchParams();

  const selectedChatId = searchParams.get("chatId");

  useErrorRedirect(error);

  return (
    <div className="flex flex-col gap-4 w-full border-secondary p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto h-screen">
      {data?.map((chat) => {
        const isSelected = selectedChatId === chat.id.toString();
        return <ChatBox chat={chat} isSelected={isSelected} key={chat.id} />;
      })}
    </div>
  );
}

const ChatBox = memo(
  ({ chat, isSelected }: { chat: IConversation; isSelected: boolean }) => {
    const { selectChat } = useInboxContext();
    return (
      <Link
        href={`/inbox?chatId=${chat.id}`}
        onClick={() => selectChat(chat)}
        key={chat.id}
        className={`flex flex-col gap-2 p-3 border-b last:border-none border-gray-200 dark:border-gray-700 transition rounded-lg cursor-pointer 
  ${
    isSelected
      ? "bg-blue-100 dark:bg-blue-900 shadow-md"
      : "hover:bg-gray-50 dark:hover:bg-gray-900 hover:shadow-md"
  }`}
      >
        <div className="flex gap-3 items-center">
          <Avatar className="rounded-full border border-gray-300 shadow-sm overflow-hidden max-h-16 max-w-16">
            <AvatarImage src={chat.user_pic} alt="User Picture" />
            <AvatarFallback>👨‍✈️</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {chat.client_name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {chat.lastMessage?.text || "No message yet..."}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(chat.lastMessage?.createdAt).toLocaleDateString(
              undefined,
              {
                month: "short",
                day: "numeric",
              }
            )}
          </p>
        </div>
      </Link>
    );
  }
);
