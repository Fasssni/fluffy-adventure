import { IUser, IUserLoginResponse } from "@/types";

export class userDto {
  name: string;
  id: number | null;
  surname: string;
  email: string;
  constructor(data: IUserLoginResponse | IUser) {
    this.name = data.name;
    this.id = data.id;
    this.surname = data.surname;
    this.email = data.email;
  }
}
