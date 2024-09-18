export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  id: number | null;
  name: string;
  surname: string;
}

export interface IConversation {
  id: number;
  user_id: number;
  to_id: string;
  client_name: string;
  user_pic: string;
  bot_id: number;
  bot_name: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: ILastMessage;
}

export interface ILastMessage {
  id: number;
  user_id: number;
  text: any;
  name: string;
  conversation_id: number;
  createdAt: string;
  updatedAt: string;
}
