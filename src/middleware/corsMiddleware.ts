import { Request, Response, NextFunction } from "express";

const corsMiddleware = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};

export default corsMiddleware;
