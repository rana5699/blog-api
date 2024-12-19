/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import { ZodError } from 'zod';
import {
  handleDuplicateError,
  handleMongooseCastError,
  handleMongooseValidationError,
  handleZodValidationError,
} from '../errors/handleErrors';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let error: any = {};

  // Determine the type of error and handle accordingly
  if (err instanceof ZodError) {
    const zodError = handleZodValidationError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    error = zodError.error;
  } else if (err?.name === 'ValidationError') {
    const mongooseValidationError = handleMongooseValidationError(err);
    statusCode = mongooseValidationError.statusCode;
    message = mongooseValidationError.message;
    error = mongooseValidationError.error;
  } else if (err?.name === 'CastError') {
    const castError = handleMongooseCastError(err);
    statusCode = castError.statusCode;
    message = castError.message;
    error = castError.error;
  } else if (err?.name === 'MongoServerError' && err.code === 11000) {
    const duplicateError = handleDuplicateError(err);
    statusCode = duplicateError.statusCode;
    message = duplicateError.message;
    error = duplicateError.error;
  }

  // Construct and send the error response
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: error,
    stack: config.node_dev === 'production' ? undefined : err.stack,
  });

  next();
};

export default globalErrorHandler;
