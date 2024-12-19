/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

// handle zod  validation eror
export const handleZodValidationError = (err: ZodError) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation failed',
    error: err.errors.map((error) => ({
      path: error.path.join('.'),
      message: error.message,
    })),
  };
};

// Handle Mongoose validation error
export const handleMongooseValidationError = (err: any) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation failed',
    error: Object.values(
      err.errors.map((error: any) => ({
        path: error.path.join('.'),
        message: error.message,
      })),
    ),
  };
};

// Handle Mongoose cast errors (e.g., invalid ObjectId)
export const handleMongooseCastError = (err: any) => ({
  statusCode: StatusCodes.NOT_FOUND,
  message: `Invalid ${err.path}: ${err.value}`,
  error: `Expected a valid ${err.path}, but received: ${err.value}`,
});

/// Handle duplicate errors (e.g., invalid ObjectId)
export const handleDuplicateError = (err: any) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return {
    statusCode: StatusCodes.CONFLICT, // HTTP 409 Conflict
    message: 'Duplicate Key Error',
    error: `The value "${value}" for the field "${field}" already exists. Please provide a unique value.`,
  };
};
