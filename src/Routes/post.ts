import { Router } from "express";
import { createPost, getPosts } from "../Controllers/post";
import { validatePost } from "../Middlewares/validationMiddleware";

const postRoutes: Router = Router();

postRoutes.post("/post", [...validatePost], createPost);
postRoutes.get("/post", getPosts);

export default postRoutes;
