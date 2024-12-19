import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import appError from '../errors/app.error';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config';
import { TUserRole } from '../modules/users/user.constant';

const auth = (...userRole: TUserRole[]) => {
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

      const role = (decoded as JwtPayload).role;

      // check user role
      if (userRole && !userRole.includes(role)) {
        return next(
          new appError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED', ''),
        );
      }

      req.user = decoded as JwtPayload;

      next();
    });
  };
};

export default auth;
