"use client";
import { IConversation } from "@/types";
import { createContext, useCallback, useContext, useState } from "react";

type StoreContexType = {
  selectedChat: IConversation | null;
  selectChat: (selected: IConversation) => void;
};

const inboxContext = createContext({} as StoreContexType);

export const useInboxContext = () => useContext(inboxContext);

export const InboxContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChat, setSelectedChat] = useState<IConversation | null>(null);

  const selectChat = useCallback((selected: IConversation) => {
    setSelectedChat(selected);
  }, []);
  return (
    <inboxContext.Provider value={{ selectedChat, selectChat }}>
      {children}
    </inboxContext.Provider>
  );
};
