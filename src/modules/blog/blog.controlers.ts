import { StatusCodes } from 'http-status-codes';
import cacthAsync from '../../utilities/catchAsync';
import responseHandelar from '../../utilities/resposeHandelar';
import { blogServices } from './bolg.services';
import { User } from '../users/user.model';
import { Blog } from './blog.model';
// Blogs
const getBlogs = cacthAsync(async (req, res, next) => {
  try {
    const result = await blogServices.getBlogsFromDb(req.query);

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
  // const referanceId = req.user?.userId;
  const referanceData = req?.user;
  try {
    // user is logged in
    if (!referanceData?.userId) {
      return responseHandelar(
        res,
        StatusCodes.UNAUTHORIZED,
        false,
        'User is not authenticated!',
        null,
      );
    }

    // Check if the user is blocked
    const loginUser = await User.findById(referanceData?.userId);

    // check user exists
    if (!loginUser) {
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Author not found !',
        null,
      );
    }

    // check if user is admin then can not create any blogs
    if (referanceData?.role === 'admin') {
      return responseHandelar(
        res,
        StatusCodes.FORBIDDEN,
        false,
        'Admin can not create any blogs !',
        null,
      );
    }

    //check  if user is blocked
    if (loginUser?.isBlocked) {
      return responseHandelar(
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
      referanceData?.userId,
    );

    // check use is blocek

    // Check if blog  saved unsuccessfully
    if (!savedBlogData) {
      return responseHandelar(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        'Blog creation faield',
        null,
      );
    }

    // if is okay
    responseHandelar(
      res,
      StatusCodes.CREATED,
      true,
      'Blog created successfully',
      {
        _id: savedBlogData?._id,
        title: savedBlogData.title,
        content: savedBlogData?.content,
        author: savedBlogData.author,
      },
    );
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
      return responseHandelar(
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
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Author not found',
        null,
      );
    }

    //check is user is blocked
    if (user?.isBlocked) {
      return responseHandelar(
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
      return responseHandelar(
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
    return responseHandelar(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      'Blog ID is required!',
      null,
    );
  }

  if (!refaranceId) {
    return responseHandelar(
      res,
      StatusCodes.UNAUTHORIZED,
      false,
      'User is not authorized to delete this blog!',
      null,
    );
  }

  try {
    // find blog
    const blog = await blogServices.getBlogByIdFromDb(id);

    if (!blog) {
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Blog not found!',
        null,
      );
    }

    // find user
    const user = await User.findById(refaranceId);

    //check is user is blocked
    if (user?.isBlocked) {
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `${user?.name} is blocked ! can not delete any blog at this moment. Please try after unbcked`,
        null,
      );
    }

    // check user is author of this blog
    Blog.authorizedUser(blog, refaranceId, res);

    await blogServices.deleteBlogFromDB(id);

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
