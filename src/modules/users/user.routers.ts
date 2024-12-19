import { Router } from "express";
import { userControlers } from "./user.controlers";
import validateRequest from "../../utilities/validateRequest";
import { userValidation } from "./user.validation";

const userRoutes = Router();

// post student data
userRoutes.post(
  "/auth/register",
  validateRequest(userValidation.userValidationSchema),
  userControlers.createUser
);

export default userRoutes;
