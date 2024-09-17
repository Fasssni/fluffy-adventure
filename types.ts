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
