"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controlers_1 = require("./user.controlers");
const validateRequest_1 = __importDefault(require("../../utilities/validateRequest"));
const user_validation_1 = require("./user.validation");
const userRoutes = (0, express_1.Router)();
// post student data
userRoutes.post("/auth/register", (0, validateRequest_1.default)(user_validation_1.userValidation.userValidationSchema), user_controlers_1.userControlers.createUser);
exports.default = userRoutes;
