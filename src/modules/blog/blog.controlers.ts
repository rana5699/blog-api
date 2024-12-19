import { StatusCodes } from 'http-status-codes';
import cacthAsync from '../../utilities/catchAsync';
import responseHandelar from '../../utilities/resposeHandelar';
import { blogServices } from './bolg.services';
import { NextFunction, Request, Response } from 'express';

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
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if ID is provided
    if (!id) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Blog not found !',
        null,
      );
    }

    // Update blog in the database
    const updatedBlog = await blogServices.updateBlogFromDB(updateData, id);

    // Check if update was successful
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
    return responseHandelar(
      res,
      StatusCodes.OK,
      true,
      'Blog updated successfully',
      {
        _id: updatedBlog?._id,
        title: updatedBlog?.title,
        content: updatedBlog?.content,
        author: updatedBlog?.author,
      },
    );
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// export all blog controlers
export const blogControllers = {
  getBlogs,
  createBlog,
  updateBlog,
};
