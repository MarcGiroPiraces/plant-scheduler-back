import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../models/errors';

export const errorMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => res.status(err.status).send(err.message);
