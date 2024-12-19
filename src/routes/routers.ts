import { Router } from "express";
import userRoutes from "../modules/users/user.routers";
import blogRoutes from "../modules/blog/blog.routers";

const router = Router();

const assignmentRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];

assignmentRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
