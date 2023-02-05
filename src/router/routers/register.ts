import express, { Router } from "express";
import isLoggedIn from "../../middleware/isLoggedIn";
import isOwner from "../../middleware/isOwner";
import isPermitted from "../../middleware/permission";
import {
  confirmRegisterService,
  getAllRegisterService,
  getRegisterService,
  payRegisterService,
  updateRegisterService,
} from "../../service/register";
import wrapAsync from "../../util/wrapAsync";

const registerRouter: Router = express.Router();

registerRouter.get("/:userId", isLoggedIn, wrapAsync(getRegisterService));
registerRouter.get(
  "",
  isLoggedIn,
  isPermitted,
  wrapAsync(getAllRegisterService)
);
registerRouter.put(
  "/:userId",
  isLoggedIn,
  isOwner,
  wrapAsync(updateRegisterService)
);
registerRouter.put(
  "/pay/:userId",
  isLoggedIn,
  isOwner,
  wrapAsync(payRegisterService)
);
registerRouter.put(
  "/confirm/:userId",
  isLoggedIn,
  isPermitted,
  wrapAsync(confirmRegisterService)
);

export default registerRouter;
