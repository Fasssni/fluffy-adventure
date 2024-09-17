import MessageBox from "@/components/messagebox";
import React from "react";

export default function Inbox() {
  return (
    <div className="h-screen w-full pl-[56px] flex-col gap-4 justify-content-end items-end">
      <div className="flex-1 h-1/2"></div>
      <div className="w-1/2 relative ">
        <MessageBox />
      </div>
    </div>
  );
}
