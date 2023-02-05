import { IRegister } from "./register";

export type IUser = {
  id: number;
  name: string;
  hashedPassword: string;
  email: string;
  permission: number;
  register: IRegister;
};
