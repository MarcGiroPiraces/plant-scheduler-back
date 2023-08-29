import dotenv from 'dotenv';

dotenv.config();

export const devConfig = {
  port: process.env.PORT as string,
  databaseUrl: process.env.DATABASE_URL as string,
};
