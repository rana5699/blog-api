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
exports.blogServices = void 0;
const blog_model_1 = require("./blog.model");
const query_builder_1 = __importDefault(require("../../builder/query.builder"));
// getAllBlog from Db
const getBlogsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new query_builder_1.default(blog_model_1.Blog.find(), query)
        .searchMethod(['title', 'content'])
        .filterMethod()
        .sortMethod();
    const result = yield blogQuery.modelQuery
        .select('-isPublished -createdAt -updatedAt -__v')
        .populate({
        path: 'author',
        select: '-password -__v',
    });
    // const result = await Blog.find()
    //   .select('-isPublished -createdAt -updatedAt -__v')
    //   .populate({
    //     path: 'author',
    //     select: '-password -__v',
    //   });
    return result;
});
// createBlogIntoDB
const createBlogIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    payload.author = id;
    const result = yield blog_model_1.Blog.create(payload);
    yield result.populate({
        path: 'author',
        select: ' -password -__v',
    });
    return result;
});
// getBlogByIdFromDb
const getBlogByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id);
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
// delete blog
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
// export all blog services
exports.blogServices = {
    getBlogsFromDb,
    createBlogIntoDB,
    getBlogByIdFromDb,
    updateBlogFromDB,
    deleteBlogFromDB,
};
