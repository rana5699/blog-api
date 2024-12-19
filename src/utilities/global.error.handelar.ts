/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import { ZodError } from 'zod';
import {
  handleMongooseCastError,
  handleMongooseValidationError,
  handleZodValidationError,
} from '../errors/handleErrors';

const globalErrorHandelar = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong !';

  // check  error from where
  if (err instanceof ZodError) {
    const zodError = handleZodValidationError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
  } else if (err?.name === 'ValidatorError') {
    const mongooseValidationError = handleMongooseValidationError(err);
    statusCode = mongooseValidationError.statusCode;
    message = mongooseValidationError.message;
  } else if (err.name === 'CastError') {
    const castError = handleMongooseCastError(err);
    statusCode = castError.statusCode;
    message = castError.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
    error: err || {},
    stack: config.node_dev === 'production' ? null : err.stack,
  });
  next();
};
export default globalErrorHandelar;
