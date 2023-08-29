import {
  GetAllUsersQueryParams,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../models/users';
import {
  getAllUsersfromDb,
  getUserById,
  registerUserToDb,
} from '../repository.ts/users';
import { createHash } from '../utils.ts/createHash';

export const getAllUsers = async (
  queryParams: GetAllUsersQueryParams,
): Promise<Array<RegisterUserResponse | string>> => {
  const users = await getAllUsersfromDb(queryParams);
  return users as RegisterUserResponse[];
};

export const registerUser = async (
  user: RegisterUserRequest,
): Promise<RegisterUserResponse | void> => {
  const hashedPassword = await createHash(user.password);
  const userDb = { ...user, password: hashedPassword };

  const lastRegisteredUserId = await registerUserToDb(userDb);
  if (!lastRegisteredUserId) return;

  const registeredUser = await getUserById(lastRegisteredUserId);

  return registeredUser;
};
