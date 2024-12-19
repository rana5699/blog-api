"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
exports.blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        content: zod_1.z.string().min(1, "Content is required"),
        author: zod_1.z.string(),
        isPublished: zod_1.z.boolean().default(true),
        createdAt: zod_1.z.date().default(() => new Date()),
        updatedAt: zod_1.z.date().default(() => new Date()),
    }),
});
