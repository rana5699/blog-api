"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const zod_1 = require("zod");
const handleErrors_1 = require("../errors/handleErrors");
const globalErrorHandelar = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong !";
    // check  error from where
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleErrors_1.handleZodValidationError)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidatorError") {
        const mongooseValidationError = (0, handleErrors_1.handleMongooseValidationError)(err);
        statusCode = mongooseValidationError.statusCode;
        message = mongooseValidationError.message;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode,
        error: err.issues || {},
        stack: config_1.default.node_dev === "production" ? null : err.stack,
    });
    next();
};
exports.default = globalErrorHandelar;
