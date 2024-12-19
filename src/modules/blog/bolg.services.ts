import { Blog } from "./blog.model";
import { TBlog } from "./bolg.interface";

// getAllBlog from Db

const getBlogsFromDb = async () => {
  const result = await Blog.find().populate({
    path: "author",
    select: "name email",
  });

  return result;
};

// createBlogIntoDB
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);

  await result.populate({
    path: "author",
    select: "name email",
  });

  return result;
};

// export all blog services
export const blogServices = {
  getBlogsFromDb,
  createBlogIntoDB,
};
