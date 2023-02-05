import { LOGIN_REQUIRED } from "./../constants/error";
import type { NextFunction, Request, Response } from "express";

const isOwner = (req: Request, _: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { user } = req.body;
  if (!userId) throw new Error(LOGIN_REQUIRED);
  if (user.id !== parseInt(userId as string)) throw new Error(LOGIN_REQUIRED);
  next();
};

export default isOwner;
