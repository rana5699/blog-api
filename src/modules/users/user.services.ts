import { TUser } from './user.interfaces';
import { User } from './user.model';

// createUserIntoDB
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// get sigle user for check
// const getUserByEmail = async (email: string) => {
//   const result = await User.findOne({ email });
//   return result;
// };

// export all methods
export const userServices = {
  createUserIntoDB,
  // getUserByEmail,
};
