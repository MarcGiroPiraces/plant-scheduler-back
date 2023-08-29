import { Request, Response, NextFunction } from 'express';

export const myLogger = (_req: Request, _res: Response, next: NextFunction) => {
  console.log('Request logged');
  next();
};
