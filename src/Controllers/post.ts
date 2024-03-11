// Import required modules
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Create an instance of Prisma client
const prisma = new PrismaClient();

// Define the controller function for creating a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;

    // Check if title, content, and authorId are provided
    if (!title || !content || !userId) {
      return res
        .status(400)
        .json({ error: "Title, content, and authorId are required" });
    }

    // Check if author with given ID exists
    const authorExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!authorExists) {
      return res
        .status(404)
        .json({ error: "Author with provided ID does not exist" });
    }

    // Create a new post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    // Fetch all posts from the database
    const posts = await prisma.post.findMany();

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};
