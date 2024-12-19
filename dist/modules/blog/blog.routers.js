"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controlers_1 = require("./blog.controlers");
const validateRequest_1 = __importDefault(require("../../utilities/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../../utilities/auth"));
const blogRoutes = (0, express_1.Router)();
// get all blogs
blogRoutes.get('/blogs', blog_controlers_1.blogControllers.getBlogs);
// post blog
blogRoutes.post('/blogs', (0, auth_1.default)(), (0, validateRequest_1.default)(blog_validation_1.blogValidationSchema), blog_controlers_1.blogControllers.createBlog);
// update blog
blogRoutes.patch('/blogs/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(blog_validation_1.blogUpdateValidationSchema), blog_controlers_1.blogControllers.updateBlog);
// update blog
blogRoutes.delete('/blogs/:id', (0, auth_1.default)(), blog_controlers_1.blogControllers.deleteBlog);
exports.default = blogRoutes;
