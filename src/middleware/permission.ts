import { LOGIN_REQUIRED } from "./../constants/error";
import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PERMISSION } from "../constants/error";

const isPermitted = (req: Request, _: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const jwt_secret: string | undefined = process.env.JWT_SECRET;
  const token = req?.headers?.authorization?.replace("Bearer ", "");
  if (!authorization || !jwt_secret || !token) throw new Error(LOGIN_REQUIRED);
  const user = jwt.verify(token, jwt_secret) as JwtPayload;
  if (!user) throw new Error(LOGIN_REQUIRED);
  if (user.id > 2) throw new Error(PERMISSION);
  req.body.userId = user.id;
  req.body.user = user;
  next();
};

export default isPermitted;
