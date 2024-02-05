import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../Exceptions/bad-requests";
import { ErrorCodes } from "../Exceptions/root";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestsException("User already exists", ErrorCodes.USER_ALREADY_EXISTS);
  }

  user = await prismaClient.user.create({
    data: { email, name, password: hashSync(password, 10) },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("User does not exist");
  }

  if (!compareSync(password, user.password)) {
    throw Error("Invalid password");
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
