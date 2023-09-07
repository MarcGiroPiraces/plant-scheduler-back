import { z } from 'zod';

export const SpotSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  createdBy: z.number().int().positive(),
  updatedBy: z.number().int().positive().nullable(),
});

export const CreateSpotRequestSchema = SpotSchema.pick({
  name: true,
}).merge(z.object({ userId: z.number().int().positive() }));

export const UpdateSpotRequestSchema = CreateSpotRequestSchema;
