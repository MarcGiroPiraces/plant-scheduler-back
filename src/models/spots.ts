import { z } from 'zod';
import { CreateSpotRequestSchema } from '../zod/spots';

export type Spot = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: number;
  updatedBy?: number | null;
};

export type CreateSpot = z.infer<typeof CreateSpotRequestSchema>;

export type CreateSpotResponse = Pick<Spot, 'id' | 'name'>;

export type GetUsersSpotsResponse = Spot & { username: string };
