import { Router } from "express";
import { blogControllers } from "./blog.controlers";
import validateRequest from "../../utilities/validateRequest";
import { blogValidationSchema } from "./blog.validation";
import auth from "../../utilities/auth";

const blogRoutes = Router();

blogRoutes.post(
  "/blogs",
  auth(),
  validateRequest(blogValidationSchema),
  blogControllers.createBlog
);
blogRoutes.get("/blogs", blogControllers.getBlogs);

export default blogRoutes;
