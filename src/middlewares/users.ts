import { NextFunction, Request, Response } from 'express';
import { RegisterUserSchema } from '../zod/users';

export const checkCreateUserBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  const checkBody = RegisterUserSchema.safeParse(body);
  if (!checkBody.success) {
    return res.status(400).send('Invalid body');
  }

  next();
};
