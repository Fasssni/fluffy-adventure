import { Label } from "@radix-ui/react-label";
import React, { FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { TooltipContent } from "./ui/tooltip";
import { inboxApi, useSendMessageMutation } from "@/store/api/inboxApi";
import { useInboxContext } from "@/context/inbox-context";
import { useUser } from "@/hooks/useUser";
import { useAppDispatch } from "@/store/store";

export default function MessageBox({ ...props }) {
  const [message, setMessage] = useState<string>("");
  const { selectedChat } = useInboxContext();
  const { name } = useUser();
  const dispatch = useAppDispatch();
  const [sendMessage, { isLoading, isError }] = useSendMessageMutation();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    const { data } = await sendMessage({
      id: selectedChat.id,
      body: {
        user_id: selectedChat.user_id,
        name,
        to_id: selectedChat.to_id,
        text: message,
      },
    });
    if (!isError) {
      setMessage("");
      dispatch(
        inboxApi.util.updateQueryData(
          "getChatById",
          selectedChat.id.toString(),
          (draft) => {
            draft.push(data);
          }
        )
      );
    }
  }
  return (
    <form
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      x-chunk="dashboard-03-chunk-1"
      onSubmit={onSubmit}
      {...props}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div className="flex items-center p-3 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
