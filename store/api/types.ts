export type SendMessageBodyType = {
  id: number;
  body: {
    user_id: number | null;
    text: string;
    name: string;
    to_id: string | null;
  };
};
