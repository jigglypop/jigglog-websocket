import { IUser } from "./user";

export type IRegister = {
  id: number;
  name: string;
  email: string;
  birth: string;
  country: string;
  phone: string;
  memberId: string;
  course: string;
  confirm: boolean;
  category: string;
  user: IUser;
};

export type IRegisterForm = {
  birth: string;
  country: string;
  phone: string;
  memberId: string;
  course: string;
};
