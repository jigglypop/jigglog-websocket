import { IPost } from "./register";

export type IUser = {
  id: number;
  name: string;
  hashedPassword: string;
  email: string;
  permission: number;
  posts: IPost[];
};
