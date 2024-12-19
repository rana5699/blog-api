"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const resposeHandelar_1 = __importDefault(require("../../utilities/resposeHandelar"));
const http_status_codes_1 = require("http-status-codes");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        minlength: 1,
        required: true,
    },
    content: {
        type: String,
        minlength: 1,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
// create static for check user is blocked
// create static for check authorized user
blogSchema.static('authorizedUser', function (blog, userId, res) {
    // check user is authorized to update this blog
    if (!blog || blog.author.toString() !== userId) {
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.FORBIDDEN, false, 'You are not the author of this blog !', null);
    }
});
// Export Blog model
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
