import { StatusCodes } from 'http-status-codes';
import cacthAsync from '../../utilities/catchAsync';
import responseHandelar from '../../utilities/resposeHandelar';
import { blogServices } from './bolg.services';

// Blogs
const getBlogs = cacthAsync(async (req, res, next) => {
  try {
    const result = await blogServices.getBlogsFromDb();

    responseHandelar(
      res,
      StatusCodes.OK,
      true,
      'Blogs fetched successfully',
      result,
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
        'Blog creation faield',
        null,
      );
    }

    // if is okay
    responseHandelar(res, StatusCodes.OK, true, 'Blog created successfully', {
      _id: savedBlogData?._id,
      title: savedBlogData.title,
      content: savedBlogData?.content,
      author: savedBlogData.author,
    });
  } catch (error) {
    next(error);
  }
});

// updateBlog
const updateBlog = cacthAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if ID is provided
  if (!id) {
    responseHandelar(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      'Blog ID is required!',
      null,
    );
  }

  try {
    // Update blog in the database
    const updatedBlog = await blogServices.updateBlogFromDB(updateData, id);

    // Check if update was not successful
    if (!updatedBlog) {
      responseHandelar(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        'Blog update failed!',
        null,
      );
    }

    // Success response
    responseHandelar(res, StatusCodes.OK, true, 'Blog updated successfully', {
      _id: updatedBlog?._id,
      title: updatedBlog?.title,
      content: updatedBlog?.content,
      author: updatedBlog?.author,
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
});

// deleteBlog
const deleteBlog = cacthAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    responseHandelar(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      'Blog ID is required!',
      null,
    );
  }

  try {
    const isDeleted = await blogServices.deleteBlogFromDB(id);

    if (!isDeleted) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Blog not found!',
        null,
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
});

// export all blog controlers
export const blogControllers = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
