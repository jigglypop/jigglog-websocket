import jwt from "jsonwebtoken";
import { INVALID_TOKEN } from "../constants/error";
import { User } from "../model/entity/user";

// 토큰 발급
export const generateToken = (user: User): string => {
  const jwt_secret: string | undefined = process.env.JWT_SECRET;
  if (!jwt_secret) throw new Error(INVALID_TOKEN);
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, jwt_secret, {
    expiresIn: process.env.JWT_EXPIRED,
  });
};
