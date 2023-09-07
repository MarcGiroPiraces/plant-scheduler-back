import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const RegisterUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserIdAndEmailSchema = UserSchema.pick({
  id: true,
  email: true,
});

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
  .partial()
  .merge(z.object({ userId: z.number().int().positive() }));
