import { StatusCodes } from 'http-status-codes';
import cacthAsync from '../../utilities/catchAsync';
import responseHandelar from '../../utilities/resposeHandelar';
import { adminServices } from './admin.services';
import { User } from '../users/user.model';

// userBlock
const userBlock = cacthAsync(async (req, res, next) => {
  const { userId } = req.params;
  const refanceData = req?.user;
  try {
    const isAdminExists = await User.findById(refanceData?.userId);

    // check is admin
    if (!isAdminExists) {
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Admin not found in the database!',
        null,
      );
    }

    // check is admin
    if (refanceData?.role !== 'admin') {
      return responseHandelar(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        'Only admin can block any user !',
        null,
      );
    }

    // check admin role === user role
    const user = await User.findById(userId);

    if (user?.role === refanceData?.role) {
      return responseHandelar(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        `${user?.name} is ${user?.role} can not block !`,
        null,
      );
    }

    const result = await adminServices.blockUserFromDB(userId);

    // check user is exist
    if (!result) {
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'User not found !',
        null,
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
});

// delete blog
const deleteBlog = cacthAsync(async (req, res, next) => {
  const { id } = req.params;
  const refanceData = req?.user;

  if (!id) {
    responseHandelar(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      'Blog ID is must need !',
      null,
    );
  }
  try {
    const isAdminExists = await User.findById(refanceData?.userId);

    // check is admin
    if (!isAdminExists) {
      return responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Admin not found in the database!',
        null,
      );
    }

    // check is admin
    if (refanceData?.role !== 'admin') {
      responseHandelar(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        'Only admin can delete any blog !',
        null,
      );
    }

    const result = await adminServices.deleteBlogFromDB(id);

    // check BLOG is exist
    if (!result) {
      responseHandelar(
        res,
        StatusCodes.NOT_FOUND,
        false,
        'Blog not found !',
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
// export alll admin services
export const adminControlers = {
  userBlock,
  deleteBlog,
};
