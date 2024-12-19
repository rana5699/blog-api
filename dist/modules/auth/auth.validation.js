"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInfoValidation = void 0;
const zod_1 = require("zod");
exports.loginInfoValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required !" })
            .email("Invalid Email format"),
        password: zod_1.z.string({ required_error: "Password is required !" }),
    }),
});
