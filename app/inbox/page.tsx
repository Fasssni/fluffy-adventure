import ChatList from "@/components/chat-list";
import MessageBox from "@/components/messagebox";

export default function InboxPage() {
  return (
    <div className="h-screen w-full pl-[56px] flex gap-1 items-start justify-start">
      <div className=" w-1/3">
        <ChatList />
      </div>
      <div className="w-2/3 relative h-full flex items-end">
        <MessageBox style={{ width: "100%" }} />
      </div>
    </div>
  );
}
