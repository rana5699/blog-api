"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define responseHandelar for global respose
const responseHandelar = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};
exports.default = responseHandelar;
