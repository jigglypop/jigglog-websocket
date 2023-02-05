import express, { Router } from "express";
import { checkService, loginService, signUpService } from "../../service/auth";
import jwtMiddleware from "../../middleware/jwtMiddleware";
import wrapAsync from "../../util/wrapAsync";

const authRouter: Router = express.Router();

authRouter.post("/register", wrapAsync(signUpService));
authRouter.post("/login", wrapAsync(loginService));
authRouter.get("/check", jwtMiddleware, wrapAsync(checkService));

export default authRouter;
