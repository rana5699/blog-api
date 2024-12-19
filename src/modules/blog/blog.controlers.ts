import { StatusCodes } from 'http-status-codes';
import cacthAsync from '../../utilities/catchAsync';
import responseHandelar from '../../utilities/resposeHandelar';
import { blogServices } from './bolg.services';
import { User } from '../users/user.model';
import { Blog } from './blog.model';

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
  const referanceId = req.user?.userId;
  try {
    // user is logged in
    if (!referanceId) {
      responseHandelar(
        res,
        StatusCodes.UNAUTHORIZED,
        false,
        'User is not authenticated!',
        null,
      );
    }

    // Check if the user is blocked
    const loginUser = await User.findById(referanceId);

    // check user exists
    if (!loginUser) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Author not found !',
        null,
      );
    }

    if (loginUser?.isBlocked) {
      responseHandelar(
        res,
        StatusCodes.FORBIDDEN,
        false,
        'User is blocked and cannot create blogs!',
        null,
      );
    }

    const blogData = req.body;

    const savedBlogData = await blogServices.createBlogIntoDB(
      blogData,
      referanceId,
    );

    // check use is blocek

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
  const refaranceId = req.user?.userId;

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
    // check blog isBlogExsits
    const isBlogExsits = await blogServices.getBlogByIdFromDb(id);

    if (!isBlogExsits) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'BLOG NOT FOUND !',
        null,
      );
    }

    // check user is blocked

    const user = await User.findById(refaranceId);

    // check user is exists
    if (!user) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Author not found',
        null,
      );
    }

    //check is user is blocked
    if (user?.isBlocked) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `${user?.name} is blocked ! can not update blog this moment. Please try after unbcked`,
        null,
      );
    }

    // check user is authorized to update this blog (static method)
    Blog.authorizedUser(isBlogExsits, refaranceId, res);

    const updateData = req.body;
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
  const refaranceId = req.user?.userId;

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
    // find user
    const user = await User.findById(refaranceId);

    //check is user is blocked
    if (user?.isBlocked) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `${user?.name} is blocked ! can not delete any blog at this moment. Please try after unbcked`,
        null,
      );
    }

    // find blog
    const blog = await blogServices.getBlogByIdFromDb(id);

    // check user is author of this blog
    Blog.authorizedUser(blog, refaranceId, res);

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

    // check is authorized user

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
