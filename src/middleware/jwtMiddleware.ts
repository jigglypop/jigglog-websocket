import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { INVALID_TOKEN } from "../constants/error";

const jwtMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const jwt_secret: string | undefined = process.env.JWT_SECRET;
  const token = req?.headers?.authorization?.replace("Bearer ", "");
  if (!authorization || !jwt_secret || !token) throw new Error(INVALID_TOKEN);
  const user = jwt.verify(token, jwt_secret) as JwtPayload;
  req.body.userId = user.id;
  req.body.user = user;
  next();
};

export default jwtMiddleware;
