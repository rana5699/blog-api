"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    node_dev: process.env.NODE_ENV,
    port: process.env.PORT,
    salt_round: process.env.SALT_ROUND,
    dataBase: process.env.DATABASEURL,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
};
