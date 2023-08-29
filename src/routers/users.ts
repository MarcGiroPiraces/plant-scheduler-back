import express, { Request, Response } from 'express';
import { GetAllUsersQueryParams, RegisterUserRequest } from '../models/users';
import { getAllUsers, registerUser } from '../controllers/users';
import { checkCreateUserBodyMiddleware } from '../middlewares/users';

export const router = express.Router();

router.get(
  '/',
  async (
    req: Request<any, any, any, GetAllUsersQueryParams>,
    res: Response,
  ) => {
    const queryParams = req.query;

    const users = await getAllUsers(queryParams);

    return res.send(users);
  },
);

router.post(
  '/register',
  checkCreateUserBodyMiddleware,
  async (req: Request, res: Response) => {
    const user: RegisterUserRequest = req.body;
    const registeredUser = await registerUser(user);
    return res.send(registeredUser);
  },
);

export default router;
