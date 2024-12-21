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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 3,
        required: true,
    },
    role: {
        type: String,
        enum: ['user'],
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// // create static for check user is blocked
// userSchema.static('isUserBlocked', function (res, user) {
//   if (user?.isBlocked) {
//     responseHandelar(
//       res,
//       StatusCodes.FORBIDDEN,
//       false,
//       'User is blocked !',
//       null,
//     );
//   }
// });
// // check user is exist
// userSchema.static('userExists', async function (id) {
//   const user = await this.findById(id);
//   if (!user) {
//     throw new Error('User not found!');
//   }
//   return user;
// });
// hashed password
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = bcrypt_1.default.hashSync(this.password, Number(config_1.default.salt_round));
    });
});
// empty password after save as response
userSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = '';
    });
});
// Export User model
exports.User = (0, mongoose_1.model)('User', userSchema);
