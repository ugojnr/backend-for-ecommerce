import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./Routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./Middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);
app.use(errorMiddleware)

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
}).$extends({
    query: {
        user: {
            create({args, query}){
                args.data = SignUpSchema.parse(args.data)
                return query(args)
            }
        }
    }
})
app.listen(PORT, () => {
  console.log("Example app listening on port 4000!");
});
