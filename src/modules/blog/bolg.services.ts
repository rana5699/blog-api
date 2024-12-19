import { Types } from 'mongoose';
import { Blog } from './blog.model';
import { TBlog } from './bolg.interface';

// getAllBlog from Db
const getBlogsFromDb = async () => {
  const result = await Blog.find().select('-_id title content').populate({
    path: 'author',
    select: '-_id name',
  });

  return result;
};

// createBlogIntoDB
const createBlogIntoDB = async (payload: TBlog, id: Types.ObjectId) => {
  payload.author = id;
  const result = await Blog.create(payload);

  await result.populate({
    path: 'author',
    select: 'name email',
  });

  return result;
};

// getBlogByIdFromDb
const getBlogByIdFromDb = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

// updateBlogFromDB
const updateBlogFromDB = async (payload: Partial<TBlog>, id: string) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  });

  await result?.populate({
    path: 'author',
    select: 'name email',
  });

  return result;
};

// delete blog
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

// export all blog services
export const blogServices = {
  getBlogsFromDb,
  createBlogIntoDB,
  getBlogByIdFromDb,
  updateBlogFromDB,
  deleteBlogFromDB,
};
