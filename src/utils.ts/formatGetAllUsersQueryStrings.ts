import { DefaultQueryParams } from '../models/users';
import * as mysql from 'mysql2/promise';

export const formatGetAllUsersQueryStrings = (
  defaultParams: DefaultQueryParams,
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
