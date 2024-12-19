import express, { Application } from "express";

import cors from "cors";
import dotenv from "dotenv";
import globalErrorHandelar from "./utilities/global.error.handelar";
import notFound from "./utilities/notFound";
import userRoutes from "./modules/users/user.routers";
import blogRoutes from "./modules/blog/blog.routers";
import authRouter from "./modules/auth/auth.routerts";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// assigment routers
app.use("/api", userRoutes);
app.use("/api", blogRoutes);
app.use("/api", authRouter);

// check server response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// global error handelar
app.use(globalErrorHandelar);

// not found
app.use(notFound);

export default app;
