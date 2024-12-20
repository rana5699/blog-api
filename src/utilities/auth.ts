/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/app.error';
import { TUserRole } from '../modules/users/user.constant';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config';

const auth = (...userRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(
          new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
        );
      }

      // Verify token
      jwt.verify(token, `${config.jwt_access_token}`, (err, decoded) => {
        if (err) {
          return next(
            new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
          );
        }

        const { role } = decoded as JwtPayload;

        // Check user role
        if (userRoles.length && !userRoles.includes(role as TUserRole)) {
          return next(
            new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
          );
        }

        // Attach the decoded token to the request object
        req.user = decoded as JwtPayload;

        next();
      });
    } catch (error: any) {
      next(
        new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `${error.message || 'Something went wrong'}`,
        ),
      );
    }
  };
};

export default auth;
