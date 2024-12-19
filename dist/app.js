"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const global_error_handelar_1 = __importDefault(require("./utilities/global.error.handelar"));
const notFound_1 = __importDefault(require("./utilities/notFound"));
const user_routers_1 = __importDefault(require("./modules/users/user.routers"));
const blog_routers_1 = __importDefault(require("./modules/blog/blog.routers"));
const auth_routerts_1 = __importDefault(require("./modules/auth/auth.routerts"));
const admin_routers_1 = __importDefault(require("./modules/admin/admin.routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// assigment routers
app.use('/api', user_routers_1.default);
app.use('/api', blog_routers_1.default);
app.use('/api', auth_routerts_1.default);
app.use('/api', admin_routers_1.default);
// check server response
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// global error handelar
app.use(global_error_handelar_1.default);
// not found
app.use(notFound_1.default);
exports.default = app;
