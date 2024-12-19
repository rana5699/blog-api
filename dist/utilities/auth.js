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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_error_1 = __importDefault(require("../errors/app.error"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config/config"));
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED', ''));
        }
        // Verify token
        jsonwebtoken_1.default.verify(token, `${config_1.default.jwt_access_token}`, (err, decoded) => {
            if (err) {
                return next(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED', ''));
            }
            req.user = decoded;
            next();
        });
    });
};
exports.default = auth;
