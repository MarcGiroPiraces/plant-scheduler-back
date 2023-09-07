import { connectToDatabase } from '../database/db';
import {
  GetAllUsersQueryParams,
  RegisterUserRequest,
  RegisterUserResponse,
  User,
  UserIdAndPassword,
} from '../models/users';
import {
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIdQuery,
  getUserPasswordByEmailQuery,
  registerUserQuery,
  updateUserQuery,
} from '../queries/users';
import { RowDataPacket } from 'mysql2/promise';
import * as mysql from 'mysql2/promise';
import { formatLimitOffsetQueryStrings } from '../utils.ts/formatLimitOffsetQueryStrings';
import { formatGetAllUsersQueryStrings } from '../utils.ts/formatGetAllUsersQueryStrings';
import { getLastInsertedIdQuery } from '../queries/general';

export const getAllUsersfromDb = async (
  filterParams: GetAllUsersQueryParams,
): Promise<Array<RegisterUserResponse> | Error> => {
  let query = getAllUsersQuery;
  let defaultQueryParamsQuery = '';
  let filterQueryParamsQuery = '';
  if (filterParams) {
    const { limit, offset, ...rest } = filterParams;
    if (limit || offset) {
      defaultQueryParamsQuery = formatLimitOffsetQueryStrings({
        limit: limit,
        offset: offset,
      });
    }

    if (rest) {
      filterQueryParamsQuery = formatGetAllUsersQueryStrings(rest);
    }
    query = mysql.format(
      `${query} ${filterQueryParamsQuery} ${defaultQueryParamsQuery}`,
    );
  }

  const connection = await connectToDatabase();
  const [rows] = await connection.execute<RowDataPacket[]>(query);
  connection.end();

  return rows as Array<RegisterUserResponse>;
};

export const registerUserToDb = async (
  user: RegisterUserRequest,
): Promise<number> => {
  const query = registerUserQuery;
  const { name, email, password } = user;
  const connection = await connectToDatabase();

  await connection.execute(query, [name, email, password]);
  const [rows] = await connection.execute<RowDataPacket[]>(
    getLastInsertedIdQuery,
  );

  connection.end();
  const lastRegisteredUserId = rows[0].id as number;

  return lastRegisteredUserId;
};

export const getUserById = async (id: number): Promise<User> => {
  const query = getUserByIdQuery;
  const connection = await connectToDatabase();

  const [rows] = await connection.execute<RowDataPacket[]>(query, [id]);
  connection.end();

  const user = rows[0] as User;
  return user;
};

export const getUserPasswordByEmail = async (
  email: string,
): Promise<UserIdAndPassword> => {
  const query = getUserPasswordByEmailQuery;

  const connection = await connectToDatabase();
  const [rows] = await connection.execute<RowDataPacket[]>(query, [email]);
  connection.end();

  const user = rows[0] as UserIdAndPassword;
  return user;
};

export const updateUserToDb = async (
  user: User,
  id: number,
): Promise<number> => {
  const query = updateUserQuery;
  const { name, email, password } = user;
  const connection = await connectToDatabase();

  await connection.execute(query, [name, email, password, id]);
  const [rows] = await connection.execute<RowDataPacket[]>(
    getLastInsertedIdQuery,
  );
  connection.end();

  return rows[0].id as number;
};

export const deleteUserFromDb = async (id: number): Promise<number> => {
  const query = deleteUserQuery;
  const connection = await connectToDatabase();

  await connection.execute(query, [id]);
  connection.end();

  return id;
};
