import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../models/errors';
import { CreateSpotRequestSchema, UpdateSpotRequestSchema } from '../zod/spots';

export const checkCreateSpotBodyMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const spot = req.body;
    CreateSpotRequestSchema.parse(spot);
    next();
  } catch (error) {
    const errorMessage = 'Error validating spot body';
    const status = 400;
    const errorFormatted = new ErrorHandler(errorMessage, status);
    next(errorFormatted);
  }
};

export const checkUpdateSpotBodyMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const spot = req.body;
    UpdateSpotRequestSchema.parse(spot);
    next();
  } catch (error) {
    const errorMessage = 'Error validating spot body';
    const status = 400;
    const errorFormatted = new ErrorHandler(errorMessage, status);
    next(errorFormatted);
  }
};
