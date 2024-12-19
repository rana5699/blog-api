import { StatusCodes } from "http-status-codes";
import cacthAsync from "../../utilities/catchAsync";
import responseHandelar from "../../utilities/resposeHandelar";
import { blogServices } from "./bolg.services";

// Blogs
const getBlogs = cacthAsync(async (req, res, next) => {
  try {
    const result = await blogServices.getBlogsFromDb();

    responseHandelar(
      res,
      StatusCodes.OK,
      true,
      "Blogs fetched successfully",
      result
    );
  } catch (error) {
    next(error);
  }
});

// createBlog
const createBlog = cacthAsync(async (req, res, next) => {
  try {
    const blogData = req.body;

    const savedBlogData = await blogServices.createBlogIntoDB(blogData);

    // Check if blog  saved unsuccessfully
    if (!savedBlogData) {
      responseHandelar(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        "Blog creation faield",
        null
      );
    }

    // if is okay
    responseHandelar(res, StatusCodes.OK, true, "Blog created successfully", {
      _id: savedBlogData?._id,
      title: savedBlogData.title,
      content: savedBlogData?.content,
      author: savedBlogData.author,
    });
  } catch (error) {
    next(error);
  }
});

// export all blog controlers
export const blogControllers = {
  getBlogs,
  createBlog,
};
