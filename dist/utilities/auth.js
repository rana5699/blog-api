"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_error_1 = __importDefault(require("../errors/app.error"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config/config"));
const auth = (...userRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'));
            }
            // Verify token
            jsonwebtoken_1.default.verify(token, `${config_1.default.jwt_access_token}`, (err, decoded) => {
                if (err) {
                    return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'));
                }
                const { role } = decoded;
                // Check user role
                if (userRoles.length && !userRoles.includes(role)) {
                    return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'));
                }
                // Attach the decoded token to the request object
                req.user = decoded;
                next();
            });
        }
        catch (error) {
            next(new app_error_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `${error.message || 'Something went wrong'}`));
        }
    });
};
exports.default = auth;
