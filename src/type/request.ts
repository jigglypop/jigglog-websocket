import { JwtPayload } from "jsonwebtoken";

export interface IUserJwt extends JwtPayload {
  id: string;
}

export type IUserJwtString = IUserJwt | string;
