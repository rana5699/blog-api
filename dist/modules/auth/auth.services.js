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
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const config_1 = __importDefault(require("../../config/config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by email
    const isUserExists = yield user_model_1.User.findOne({
        email: payload.email,
    });
    // check isUserExists
    if (!isUserExists) {
        throw new Error("User not found !!");
    }
    // check is User isBlocked
    if (isUserExists.isBlocked) {
        throw new Error(`${isUserExists.name} is blocked !!`);
    }
    //   now check valid password
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.password, isUserExists.password);
    if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
    }
    //   jwt payload
    const jwtPayload = {
        userEmail: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    //   create JWT
    const token = jsonwebtoken_1.default.sign(jwtPayload, `${config_1.default.jwt_access_token}`, {
        expiresIn: "10d",
    });
    // If email and password are correct
    return { isUserExists, token };
});
exports.authServices = {
    loginUser,
};
