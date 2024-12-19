import { StatusCodes } from "http-status-codes";
import cacthAsync from "../../utilities/catchAsync";
import responseHandelar from "../../utilities/resposeHandelar";
import { authServices } from "./auth.services";

const loginUser = cacthAsync(async (req, res, next) => {
  try {
    const { token } = await authServices.loginUser(req.body);

    responseHandelar(res, StatusCodes.OK, true, "Login successful", {
      token,
    });
  } catch (error) {
    next(error);
  }
});

export const authControlers = {
  loginUser,
};
