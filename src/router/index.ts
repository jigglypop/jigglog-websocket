import express from "express";
import authRouter from "./routers/auth";
import registerRouter from "./routers/register";

const rootController = express();

rootController.use("/api/register", registerRouter);
rootController.use("/api/auth", authRouter);

export default rootController;
