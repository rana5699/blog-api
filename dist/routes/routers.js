"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routers_1 = __importDefault(require("../modules/users/user.routers"));
const blog_routers_1 = __importDefault(require("../modules/blog/blog.routers"));
const router = (0, express_1.Router)();
const assignmentRoutes = [
    {
        path: "/",
        route: user_routers_1.default,
    },
    {
        path: "/blogs",
        route: blog_routers_1.default,
    },
];
assignmentRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
