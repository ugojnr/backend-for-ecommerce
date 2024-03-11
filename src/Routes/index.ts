import { Router } from "express";
import authRoutes from "./auth";
import postRoutes from "./post";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/post", postRoutes);

export default rootRouter;
