"use client";
import React, { useEffect } from "react";

import { useGetUserConversationsQuery } from "@/store/api/inboxAuth";
import { useAppSelector } from "@/store/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChatList() {
  const { id } = useAppSelector((state) => state.user);
  const { data, error } = useGetUserConversationsQuery(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedChatId = searchParams.get("chatId");

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error?.status === 403) {
      router.push("/login");
    }
  }, [error]);
  return (
    <div className="flex flex-col gap-4 w-full border-secondary p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {data?.map((chat) => {
        const isSelected = selectedChatId === chat.id.toString();
        return (
          <div
            key={chat.id}
            onClick={() =>
              router.push(`/inbox?chatId=${chat.id}`, undefined, {
                shallow: true,
              })
            }
            className={`flex flex-col gap-2 p-3 border-b last:border-none border-gray-200 dark:border-gray-700 transition rounded-lg cursor-pointer 
            ${
              isSelected
                ? "bg-blue-100 dark:bg-blue-900 shadow-md"
                : "hover:bg-gray-50 dark:hover:bg-gray-900 hover:shadow-md"
            }`}
          >
            <div className="flex gap-3 items-center">
              <Avatar className="rounded-full border border-gray-300 shadow-sm">
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
                  { month: "short", day: "numeric" }
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
