import { IUser } from "./IUser";

export interface ILogin {
  user: IUser;
  authenticated: boolean;
  token: string;
}
