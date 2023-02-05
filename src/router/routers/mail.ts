import { mailService } from "./../../service/mail";
import express from "express";

const mailRouter = express();
mailRouter.use("/mail", mailService);
export default mailRouter;
