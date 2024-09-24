import { updateStreamedMessages } from "@/store/helpers";
import { useAppDispatch } from "@/store/store";
import { IMessage } from "@/types";
import { useCallback, useEffect, useRef } from "react";

type SocketResponseType = {
  method: "chat-connection" | "message" | "new-conversation";
  message: IMessage;
};

export const useMessageWS = () => {
  const dispatch = useAppDispatch();
  const socketRef = useRef<WebSocket | null>(null);

  const getUserChat = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS}`);
    socketRef.current = socket;

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    socket.onmessage = (event: MessageEvent) => {
      const messages: SocketResponseType = JSON.parse(event.data);
      switch (messages.method) {
        case "message":
          if (messages.message) {
            updateStreamedMessages(dispatch, messages.message);
          }
          break;
        case "new-conversation":
          console.log("ergerg");
          break;

        default:
          console.warn("Unknown method", messages.method);
      }
    };

    return {
      close: () => socket.close(),
    };
  }, [dispatch]);

  useEffect(() => {
    const socket = getUserChat();

    return () => {
      socket?.close();
    };
  }, [getUserChat]);
};
