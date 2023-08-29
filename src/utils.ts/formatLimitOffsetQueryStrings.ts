import * as mysql from 'mysql2/promise';
import { DefaultQueryParams } from '../models/users';

export const formatLimitOffsetQueryStrings = (
  requestParams: DefaultQueryParams,
) => {
  let query = '';
  const paramsKeys = Object.entries(requestParams);

  for (const [key, value] of paramsKeys) {
    if (+value && key) {
      const number = Math.ceil(+value);
      const keyInUppercase = key.toLocaleUpperCase();
      query += mysql.format(` ${keyInUppercase} ?`, [number]);
    }
  }

  return query;
};
