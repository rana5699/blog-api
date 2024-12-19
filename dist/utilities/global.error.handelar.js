"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const zod_1 = require("zod");
const handleErrors_1 = require("../errors/handleErrors");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';
    let error = {};
    // Determine the type of error and handle accordingly
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleErrors_1.handleZodValidationError)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        error = zodError.error;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const mongooseValidationError = (0, handleErrors_1.handleMongooseValidationError)(err);
        statusCode = mongooseValidationError.statusCode;
        message = mongooseValidationError.message;
        error = mongooseValidationError.error;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const castError = (0, handleErrors_1.handleMongooseCastError)(err);
        statusCode = castError.statusCode;
        message = castError.message;
        error = castError.error;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'MongoServerError' && err.code === 11000) {
        const duplicateError = (0, handleErrors_1.handleDuplicateError)(err);
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
        stack: config_1.default.node_dev === 'production' ? undefined : err.stack,
    });
    next();
};
exports.default = globalErrorHandler;
