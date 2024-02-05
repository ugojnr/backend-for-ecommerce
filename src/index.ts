import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./Routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./Middlewares/errors";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);
app.use(errorMiddleware)

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
app.listen(PORT, () => {
  console.log("Example app listening on port 4000!");
});
