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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const blog_model_1 = require("./blog.model");
// getAllBlog from Db
const getBlogsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.find().populate({
        path: 'author',
        select: 'name email',
    });
    return result;
});
// createBlogIntoDB
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(payload);
    yield result.populate({
        path: 'author',
        select: 'name email',
    });
    return result;
});
// updateBlogFromDB
const updateBlogFromDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
    });
    yield (result === null || result === void 0 ? void 0 : result.populate({
        path: 'author',
        select: 'name email',
    }));
    return result;
});
// export all blog services
exports.blogServices = {
    getBlogsFromDb,
    createBlogIntoDB,
    updateBlogFromDB,
};
