import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../models/errors';
import { UserIdAndEmail } from '../models/users';
import { devConfig } from '../config';

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const headerAuthorization = req.header('authorization');
  if (!headerAuthorization) {
    const errorCode = 401;
    const errorMessage = 'Token missing';
    const error = new ErrorHandler(errorMessage, errorCode);
    return next(error);
  }
  const token = headerAuthorization.replace('Bearer ', '');
  try {
    jwt.verify(token, devConfig.jwtSecret as string);
    const decodedToken = jwt.decode(token) as UserIdAndEmail;
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    const errorCode = 401;
    const errorMessage = 'Invalid token';
    const errorFormatted = new ErrorHandler(errorMessage, errorCode);
    next(errorFormatted);
  }
};
