import { IMessage } from "@/types";

export type SendMessageBodyType = {
  id?: number;
  body: Partial<
    { to_id: string } & Omit<
      IMessage,
      "conversation_id" | "createdAt" | "updatedAt"
    >
  >;
};
