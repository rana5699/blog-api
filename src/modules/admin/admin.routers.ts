import { Router } from 'express';
import auth from '../../utilities/auth';
import { user_role } from '../users/user.constant';
import { adminControlers } from './admin.controlers';

const adminRouter = Router();

// user block
adminRouter.patch(
  '/admin/users/:userId/block',
  auth(user_role.admin),
  adminControlers.userBlock,
);

// blog delete
adminRouter.delete(
  '/admin/blogs/:id',
  auth(user_role.admin),
  adminControlers.deleteBlog,
);

export default adminRouter;
