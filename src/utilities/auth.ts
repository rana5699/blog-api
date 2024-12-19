import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import appError from '../errors/app.error';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return next(
        new appError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED', ''),
      );
    }

    // Verify token
    jwt.verify(token, `${config.jwt_access_token}`, (err, decoded) => {
      if (err) {
        return next(
          new appError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED', ''),
        );
      }

      console.log(decoded);
      // req.user = decoded as JwtPayload;

      next();
    });
  };
};

export default auth;
