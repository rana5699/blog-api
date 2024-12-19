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
exports.blogControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const resposeHandelar_1 = __importDefault(require("../../utilities/resposeHandelar"));
const bolg_services_1 = require("./bolg.services");
const user_model_1 = require("../users/user.model");
const blog_model_1 = require("./blog.model");
// Blogs
const getBlogs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bolg_services_1.blogServices.getBlogsFromDb();
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.OK, true, 'Blogs fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
}));
// createBlog
const createBlog = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const referanceId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        // user is logged in
        if (!referanceId) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.UNAUTHORIZED, false, 'User is not authenticated!', null);
        }
        // Check if the user is blocked
        const loginUser = yield user_model_1.User.findById(referanceId);
        // check user exists
        if (!loginUser) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, 'Author not found !', null);
        }
        if (loginUser === null || loginUser === void 0 ? void 0 : loginUser.isBlocked) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.FORBIDDEN, false, 'User is blocked and cannot create blogs!', null);
        }
        const blogData = req.body;
        const savedBlogData = yield bolg_services_1.blogServices.createBlogIntoDB(blogData, referanceId);
        // check use is blocek
        // Check if blog  saved unsuccessfully
        if (!savedBlogData) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog creation faield', null);
        }
        // if is okay
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.CREATED, true, 'Blog created successfully', {
            _id: savedBlogData === null || savedBlogData === void 0 ? void 0 : savedBlogData._id,
            title: savedBlogData.title,
            content: savedBlogData === null || savedBlogData === void 0 ? void 0 : savedBlogData.content,
            author: savedBlogData.author,
        });
    }
    catch (error) {
        next(error);
    }
}));
// updateBlog
const updateBlog = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const refaranceId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    // Check if ID is provided
    if (!id) {
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog ID is required!', null);
    }
    try {
        // check blog isBlogExsits
        const isBlogExsits = yield bolg_services_1.blogServices.getBlogByIdFromDb(id);
        if (!isBlogExsits) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, 'BLOG NOT FOUND !', null);
        }
        // check user is blocked
        const user = yield user_model_1.User.findById(refaranceId);
        // check user is exists
        if (!user) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, 'Author not found', null);
        }
        //check is user is blocked
        if (user === null || user === void 0 ? void 0 : user.isBlocked) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, `${user === null || user === void 0 ? void 0 : user.name} is blocked ! can not update blog this moment. Please try after unbcked`, null);
        }
        // check user is authorized to update this blog (static method)
        blog_model_1.Blog.authorizedUser(isBlogExsits, refaranceId, res);
        const updateData = req.body;
        // Update blog in the database
        const updatedBlog = yield bolg_services_1.blogServices.updateBlogFromDB(updateData, id);
        // Check if update was not successful
        if (!updatedBlog) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog update failed!', null);
        }
        // Success response
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.OK, true, 'Blog updated successfully', {
            _id: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog._id,
            title: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog.title,
            content: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog.content,
            author: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog.author,
        });
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
}));
// deleteBlog
const deleteBlog = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const refaranceId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!id) {
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog ID is required!', null);
    }
    try {
        // find user
        const user = yield user_model_1.User.findById(refaranceId);
        //check is user is blocked
        if (user === null || user === void 0 ? void 0 : user.isBlocked) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, `${user === null || user === void 0 ? void 0 : user.name} is blocked ! can not delete any blog at this moment. Please try after unbcked`, null);
        }
        // find blog
        const blog = yield bolg_services_1.blogServices.getBlogByIdFromDb(id);
        if (!blog) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, 'Blog not found!', null);
        }
        // check user is author of this blog
        blog_model_1.Blog.authorizedUser(blog, refaranceId, res);
        yield bolg_services_1.blogServices.deleteBlogFromDB(id);
        // check is authorized user
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: http_status_codes_1.StatusCodes.OK,
        });
    }
    catch (error) {
        next(error);
    }
}));
// export all blog controlers
exports.blogControllers = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
};
