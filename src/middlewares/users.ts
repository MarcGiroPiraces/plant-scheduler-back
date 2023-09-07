import { NextFunction, Request, Response } from 'express';
import {
  LoginUserSchema,
  RegisterUserSchema,
  UpdateUserSchema,
} from '../zod/users';
import {
  getAllUsersfromDb,
  getUserPasswordByEmail,
} from '../repository.ts/users';
import { RegisterUserResponse } from '../models/users';
import { ErrorHandler } from '../models/errors';
import bcrypt from 'bcrypt';

export const checkCreateUserBodyMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  const checkBody = RegisterUserSchema.safeParse(body);
  if (!checkBody.success) {
    const errorMessage = "Body doesn't match schema";
    const status = 400;
    const error = new ErrorHandler(errorMessage, status);
    next(error);
  }
  next();
};

export const checkUniqueEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;

  const checkEmail = (await getAllUsersfromDb({
    email: email,
  })) as Array<RegisterUserResponse>;

  if (checkEmail.length > 0) {
    return res.send('Email already exists').status(400);
  }

  next();
};

export const checkLoginUserBodyMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  const checkBody = LoginUserSchema.safeParse(body);
  if (!checkBody.success) {
    const errorMessage = "Body doesn't match schema";
    const status = 400;
    const error = new ErrorHandler(errorMessage, status);
    next(error);
  }
  next();
};

export const checkUserLoginCredentialsMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const user = await getUserPasswordByEmail(email);

  if (!user) {
    const errorMessage = 'Wrong email or password';
    const status = 400;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }

  const passwordFromDb = user.password;
  const isPasswordValid = await bcrypt.compare(password, passwordFromDb);
  if (!isPasswordValid) {
    const errorMessage = 'Wrong email or password';
    const status = 400;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }

  next();
};

export const checkUpdateUserBodyMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  const checkBody = UpdateUserSchema.safeParse(body);
  if (!checkBody.success) {
    const errorMessage = "Body doesn't match schema";
    const status = 400;
    const error = new ErrorHandler(errorMessage, status);
    next(error);
  }
  next();
};
