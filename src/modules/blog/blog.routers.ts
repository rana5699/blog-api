import { Router } from 'express';
import { blogControllers } from './blog.controlers';
import validateRequest from '../../utilities/validateRequest';
import {
  blogUpdateValidationSchema,
  blogValidationSchema,
} from './blog.validation';
import auth from '../../utilities/auth';

const blogRoutes = Router();

// get all blogs
blogRoutes.get('/blogs', blogControllers.getBlogs);

// post blog
blogRoutes.post(
  '/blogs',
  auth(),
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
blogRoutes.delete('/blogs/:id', auth(), blogControllers.deleteBlog);

export default blogRoutes;
