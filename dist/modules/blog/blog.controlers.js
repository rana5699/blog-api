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
    try {
        const blogData = req.body;
        const savedBlogData = yield bolg_services_1.blogServices.createBlogIntoDB(blogData);
        // Check if blog  saved unsuccessfully
        if (!savedBlogData) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog creation faield', null);
        }
        // if is okay
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.OK, true, 'Blog created successfully', {
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
    const { id } = req.params;
    const updateData = req.body;
    // Check if ID is provided
    if (!id) {
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog ID is required!', null);
    }
    try {
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
    const { id } = req.params;
    if (!id) {
        (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, 'Blog ID is required!', null);
    }
    try {
        const isDeleted = yield bolg_services_1.blogServices.deleteBlogFromDB(id);
        if (!isDeleted) {
            (0, resposeHandelar_1.default)(res, http_status_codes_1.StatusCodes.NOT_FOUND, false, 'Blog not found!', null);
        }
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
