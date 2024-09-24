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

export interface IMessage {
  id: number;
  user_id: number;
  text: string;
  name: string;
  conversation_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponse {
  token: string;
  user: IUserLoginResponse;
}

export interface IUserLoginResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type ChannelType = {
  id: number;
  name: string;
  bot_id: number;
};

export type TemplatesType = {
  id: number;
  bot_id: number;
  name: string;
  text: string;
  triggersTo: string;
  createdAt: string;
  updatedAt: string;
  bot_name: string;
};

export type TemplateBodyType = {
  bot_id: number;
  name: string;
  triggersTo: string;
  text: string;
};
