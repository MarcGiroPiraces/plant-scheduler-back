import { connectToDatabase } from '../database/db';
import {
  GetAllUsersQueryParams,
  RegisterUserRequest,
  RegisterUserResponse,
  User,
} from '../models/users';
import {
  getAllUsersQuery,
  getLastInsertUserIdQuery,
  getUserByIdQuery,
  registerUserQuery,
} from '../queries/users';
import { RowDataPacket } from 'mysql2/promise';
import * as mysql from 'mysql2/promise';
import { formatLimitOffsetQueryStrings } from '../utils.ts/formatLimitOffsetQueryStrings';
import { formatGetAllUsersQueryStrings } from '../utils.ts/formatGetAllUsersQueryStrings';

export const getAllUsersfromDb = async (
  filterParams: GetAllUsersQueryParams,
): Promise<Array<RegisterUserResponse> | void> => {
  try {
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
  } catch (error) {
    throw new Error(error as string);
  }
};

export const registerUserToDb = async (
  user: RegisterUserRequest,
): Promise<void | number> => {
  try {
    const connection = await connectToDatabase();
    const query = registerUserQuery;
    const { name, email, password } = user;

    await connection.execute(query, [name, email, password]);
    const [rows] = await connection.execute<RowDataPacket[]>(
      getLastInsertUserIdQuery,
    );

    connection.end();
    const lastRegisteredUserId = rows[0].id as number;

    return lastRegisteredUserId;
  } catch (error: any) {
    return error.message;
  }
};

export const getUserById = async (id: number): Promise<User | void> => {
  try {
    const connection = await connectToDatabase();
    const query = getUserByIdQuery;

    const [rows] = await connection.execute<RowDataPacket[]>(query, [id]);
    connection.end();

    const user = rows[0] as User;
    return user;
  } catch (error) {
    console.log(error);
  }
};
