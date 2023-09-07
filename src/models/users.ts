import { z } from 'zod';
import { RegisterUserSchema, UpdateUserSchema, UserSchema } from '../zod/users';
import { DefaultQueryParams } from './general';

export type User = z.infer<typeof UserSchema>;

export type RegisterUserRequest = z.infer<typeof RegisterUserSchema>;

export type RegisterUserResponse = Omit<User, 'password'>;

export type LoginUserRequest = Omit<RegisterUserRequest, 'name'>;

export type UserIdAndPassword = Pick<User, 'id' | 'password'>;

export type UserIdAndEmail = Pick<User, 'id' | 'email'>;

export type GetAllUsersFilterParams = Partial<Omit<User, 'password'>>;

export type GetAllUsersQueryParams = GetAllUsersFilterParams &
  DefaultQueryParams;

export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
