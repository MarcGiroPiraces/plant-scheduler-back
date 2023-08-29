import { Request, Response } from 'express';

export const error500Middleware = (err: Error, _req: Request, res: Response) =>
  res.status(500).send(err.message);
