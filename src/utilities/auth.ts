import { NextFunction, Request, Response } from "express";
import appError from "../errors/app.error";
import { StatusCodes } from "http-status-codes";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new appError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized",
        ""
      );
    }

    next();
  };
};

export default auth;
