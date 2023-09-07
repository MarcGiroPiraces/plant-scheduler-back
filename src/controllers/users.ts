import { NextFunction, Request, Response } from 'express';
import {
  RegisterUserRequest,
  RegisterUserResponse,
  UpdateUserRequest,
} from '../models/users';
import {
  deleteUserFromDb,
  getAllUsersfromDb,
  getUserById,
  getUserPasswordByEmail,
  registerUserToDb,
  updateUserToDb,
} from '../repository.ts/users';
import { createHash } from '../utils.ts/createHash';
import { ErrorHandler } from '../models/errors';
import jwt from 'jsonwebtoken';
import { devConfig } from '../config';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Array<RegisterUserResponse> | undefined> => {
  try {
    const queryParams = req.query;

    const users = (await getAllUsersfromDb(
      queryParams,
    )) as Array<RegisterUserResponse>;

    res.send(users).status(200);
    return;
  } catch (error) {
    const errorMessage = 'Error getting users';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<RegisterUserResponse | undefined> => {
  try {
    const user: RegisterUserRequest = req.body;
    const hashedPassword = await createHash(user.password);
    const userDb = { ...user, password: hashedPassword };

    const lastRegisteredUserId = await registerUserToDb(userDb);
    if (!lastRegisteredUserId) return {} as RegisterUserResponse;

    const registeredUser = await getUserById(lastRegisteredUserId);
    const { password, ...registerUserResponse } = registeredUser;

    res.send(registerUserResponse).status(201);
  } catch (error) {
    const errorMessage = 'Error registering user';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.body.email;

    const user = await getUserPasswordByEmail(email);

    const userData = {
      email,
      id: user.id,
    };

    const token = jwt.sign(userData, devConfig.jwtSecret);

    res.send({ token });
  } catch (error) {
    const errorMessage = 'Error logging user';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requestUserData = req.body as UpdateUserRequest;
    const userId = requestUserData.userId;

    const userDatafromDb = await getUserById(userId);
    if (!userDatafromDb) {
      const errorMessage = 'User not found';
      const status = 404;
      const errorFormatted = new ErrorHandler(errorMessage, status);

      next(errorFormatted);
    }

    if (requestUserData.password) {
      const hashedPassword = await createHash(requestUserData.password);
      requestUserData.password = hashedPassword;
    }

    const userDataToUpdate = Object.assign(userDatafromDb, requestUserData);

    await updateUserToDb(userDataToUpdate, userId);

    const { password, ...updateUserResponse } = await getUserById(userId);

    res.send(updateUserResponse).status(200);
  } catch (error) {
    const errorMessage = 'Error updating user';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.userId;

    const userDatafromDb = await getUserById(userId);
    if (!userDatafromDb) {
      const errorMessage = 'User not found';
      const status = 404;
      const errorFormatted = new ErrorHandler(errorMessage, status);

      next(errorFormatted);
    }

    const deletedUserId = await deleteUserFromDb(userId);
    const deleteUserResponse = `User with id ${deletedUserId} deleted`;

    res.send(deleteUserResponse).status(200);
  } catch (error) {
    const errorMessage = 'Error deleting user';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);

    next(errorFormatted);
  }
};
