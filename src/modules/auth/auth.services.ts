import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { TLoginInfo } from "./auth.interface";
import config from "../../config/config";

const loginUser = async (payload: TLoginInfo) => {
  // find user by email
  const isUserExists = await User.findOne({
    email: payload.email,
  });

  // check isUserExists
  if (!isUserExists) {
    throw new Error("User not found !!");
  }

  // check is User isBlocked
  if (isUserExists.isBlocked) {
    throw new Error(`${isUserExists.name} is blocked !!`);
  }

  //   now check valid password
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    isUserExists.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  //   jwt payload
  const jwtPayload = {
    userEmail: isUserExists?.email,
    role: isUserExists?.role,
  };

  //   create JWT
  const token = jwt.sign(jwtPayload, `${config.jwt_access_token}`, {
    expiresIn: "10d",
  });

  // If email and password are correct
  return { isUserExists, token };
};

export const authServices = {
  loginUser,
};
