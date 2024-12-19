"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(3, "Password must be at least 3 characters"),
        role: zod_1.z.enum(["admin", "user"]).default("user"),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
exports.userValidation = {
    userValidationSchema,
};
