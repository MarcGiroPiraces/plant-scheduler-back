import * as mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { devConfig } from '../config';

dotenv.config();

const databaseUrl = devConfig.databaseUrl;

export const connectToDatabase = async () =>
  await mysql.createConnection(databaseUrl);
