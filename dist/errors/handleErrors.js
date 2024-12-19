"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseCastError = exports.handleMongooseValidationError = exports.handleZodValidationError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
// handle zod  validation eror
const handleZodValidationError = (err) => {
    return {
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        message: 'Validation failed',
        error: err.errors.map((error) => ({
            path: error.path.join('.'),
            message: error.message,
        })),
    };
};
exports.handleZodValidationError = handleZodValidationError;
// Handle Mongoose validation error
const handleMongooseValidationError = (err) => {
    return {
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        message: 'Validation failed',
        error: Object.values(err.errors.map((error) => ({
            path: error.path.join('.'),
            message: error.message,
        }))),
    };
};
exports.handleMongooseValidationError = handleMongooseValidationError;
// Handle Mongoose cast errors (e.g., invalid ObjectId)
const handleMongooseCastError = (err) => ({
    statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
    message: `Invalid ${err.path}: ${err.value}`,
    error: `Expected a valid ${err.path}, but received: ${err.value}`,
});
exports.handleMongooseCastError = handleMongooseCastError;
