import ChatContainer from "@/components/chat-container";
import ChatList from "@/components/chat-list";
import { InboxContextProvider } from "@/context/inbox-context";
import { useRouter } from "next/router";

export default function InboxPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { chatId } = searchParams ?? { chatId: undefined };

  return (
    <InboxContextProvider>
      <div className="h-screen w-full pl-[56px] flex gap-1 items-start justify-start">
        <div className=" w-1/3">
          <ChatList />
        </div>
        {chatId ? (
          <ChatContainer chat_id={chatId} />
        ) : (
          <div className="w-2/3 relative h-full flex flex-col items-center justify-center py gap-2">
            <h1 className="text-neutral-950 font-bold text-lg">
              Please select a chat to chat
            </h1>
            <h1 className=" text-2xl">💬</h1>
          </div>
        )}
      </div>
    </InboxContextProvider>
  );
}
