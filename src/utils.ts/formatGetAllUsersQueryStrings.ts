import * as mysql from 'mysql2/promise';
import { GetAllUsersFilterParams } from '../models/users';

export const formatGetAllUsersQueryStrings = (
  defaultParams: GetAllUsersFilterParams,
) => {
  const paramsKeys = Object.entries(defaultParams);
  let query = '';
  for (const [key, value] of paramsKeys) {
    if (value && key) {
      query += mysql.format(` AND ${key}=?`, [value]);
    }
  }

  return query;
};
