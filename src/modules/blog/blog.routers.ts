import { Router } from 'express';
import { blogControllers } from './blog.controlers';
import validateRequest from '../../utilities/validateRequest';
import {
  blogUpdateValidationSchema,
  blogValidationSchema,
} from './blog.validation';
import auth from '../../utilities/auth';
import { user_role } from '../users/user.constant';

const blogRoutes = Router();

// get all blogs
blogRoutes.get('/blogs', blogControllers.getBlogs);

// post blog
blogRoutes.post(
  '/blogs',
  auth(user_role.admin, user_role.user),
  validateRequest(blogValidationSchema),
  blogControllers.createBlog,
);

// update blog
blogRoutes.patch(
  '/blogs/:id',
  auth(),
  validateRequest(blogUpdateValidationSchema),
  blogControllers.updateBlog,
);

// delete blog
blogRoutes.delete(
  '/blogs/:id',
  auth(user_role.user),
  blogControllers.deleteBlog,
);

export default blogRoutes;
