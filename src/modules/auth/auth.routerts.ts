import { Router } from "express";
import { authControlers } from "./auth.controlers";
import validateRequest from "../../utilities/validateRequest";
import { loginInfoValidation } from "./auth.validation";

const authRouter = Router();

authRouter.post(
  "/auth/login",
  validateRequest(loginInfoValidation),
  authControlers.loginUser
);

export default authRouter;
