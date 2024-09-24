"use client";
import { IConversation } from "@/types";
import { createContext, useCallback, useContext, useState } from "react";

type StoreContexType = {
  selectedChat: IConversation | undefined;
  selectChat: (selected: IConversation | undefined) => void;
};

const inboxContext = createContext({} as StoreContexType);

export const useInboxContext = () => useContext(inboxContext);

export const InboxContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChat, setSelectedChat] = useState<IConversation | undefined>(
    undefined
  );

  const selectChat = useCallback((selected: IConversation | undefined) => {
    setSelectedChat(selected);
  }, []);
  return (
    <inboxContext.Provider value={{ selectedChat, selectChat }}>
      {children}
    </inboxContext.Provider>
  );
};
