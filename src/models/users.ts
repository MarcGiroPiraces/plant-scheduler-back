import { z } from 'zod';
import { RegisterUserSchema, UserSchema } from '../zod/users';

export type User = z.infer<typeof UserSchema>;

export type RegisterUserRequest = z.infer<typeof RegisterUserSchema>;

export type RegisterUserResponse = Omit<User, 'password'>;

export type GetAllUsersFilterParams = Omit<RegisterUserRequest, 'password'>;

export type DefaultQueryParams = {
  limit?: string;
  offset?: string;
  orderBy?: string;
};

export type GetAllUsersQueryParams = GetAllUsersFilterParams &
  DefaultQueryParams;
