/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import responseHandelar from '../../utilities/resposeHandelar';
import { userServices } from './user.services';
import cacthAsync from '../../utilities/catchAsync';

// createUser
const createUser = cacthAsync(async (req, res, next) => {
  try {
    const userData = req.body;

    if (!userData) {
      res.send('must provided user data');
    }

    const saveduserData = await userServices.createUserIntoDB(userData);

    responseHandelar(
      res,
      StatusCodes.CREATED,
      true,
      'User registered successfully',
      {
        _id: saveduserData?._id,
        name: saveduserData?.name,
        email: saveduserData?.email,
      },
    );
  } catch (err: any) {
    next(err);
  }
});

// export all user controlers methods
export const userControlers = {
  createUser,
};
