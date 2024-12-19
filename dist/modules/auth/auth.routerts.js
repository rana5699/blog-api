"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controlers_1 = require("./auth.controlers");
const validateRequest_1 = __importDefault(require("../../utilities/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const authRouter = (0, express_1.Router)();
authRouter.post("/auth/login", (0, validateRequest_1.default)(auth_validation_1.loginInfoValidation), auth_controlers_1.authControlers.loginUser);
exports.default = authRouter;
