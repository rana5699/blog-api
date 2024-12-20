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
exports.userControlers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const resposeHandelar_1 = __importDefault(require("../../utilities/resposeHandelar"));
const user_services_1 = require("./user.services");
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const user_model_1 = require("./user.model");
// createUser
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        if (!userData) {
            res.send('must provided user data');
        }
        // check is user already exists
        const isExists = yield user_model_1.User.findOne({ email: userData.email });
        if (isExists) {
            return (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.CONFLICT, false, 'User email already exixts !', null);
        }
        const saveduserData = yield user_services_1.userServices.createUserIntoDB(userData);
        return (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.CREATED, true, 'User registered successfully', {
            _id: saveduserData === null || saveduserData === void 0 ? void 0 : saveduserData._id,
            name: saveduserData === null || saveduserData === void 0 ? void 0 : saveduserData.name,
            email: saveduserData === null || saveduserData === void 0 ? void 0 : saveduserData.email,
        });
    }
    catch (err) {
        next(err);
    }
}));
// export all user controlers methods
exports.userControlers = {
    createUser,
};
