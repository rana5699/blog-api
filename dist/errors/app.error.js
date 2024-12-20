"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
class AppError extends Error {
    constructor(statusCode, message, errorDetails, stack) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
        // Use the provided stack or capture it from the error's instantiation point
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    // Generate a structured error response
    toResponse() {
        return {
            success: false,
            message: this.message,
            statusCode: this.statusCode,
            error: this.errorDetails || null,
            stack: this.stack || null,
        };
    }
}
exports.default = AppError;
