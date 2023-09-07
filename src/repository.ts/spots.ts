import { RowDataPacket } from 'mysql2';
import { connectToDatabase } from '../database/db';
import { CreateSpot, GetUsersSpotsResponse, Spot } from '../models/spots';
import {
  getUserSpotsFromDbByIdQuery,
  createSpotQuery,
  deleteSpotFromDbByIdQuery,
  getSpotByIdQuery,
  updateSpotByIdQuery,
} from '../queries/spots';
import { getLastInsertedIdQuery } from '../queries/general';

export const createSpotToDb = async (spot: CreateSpot): Promise<number> => {
  const query = createSpotQuery;
  const { name, userId } = spot;
  const connection = await connectToDatabase();

  await connection.execute(query, [name, userId]);
  const [rows] = await connection.execute<RowDataPacket[]>(
    getLastInsertedIdQuery,
  );
  connection.end();
  return rows[0].id;
};

export const getUserSpotsFromDb = async (
  userId: string,
): Promise<Array<GetUsersSpotsResponse>> => {
  const query = getUserSpotsFromDbByIdQuery;
  const connection = await connectToDatabase();

  const [rows] = await connection.execute<RowDataPacket[]>(query, [userId]);
  connection.end();

  return rows as Array<GetUsersSpotsResponse>;
};

export const deleteSpotFromDb = async (spotId: number): Promise<number> => {
  const query = deleteSpotFromDbByIdQuery;
  const connection = await connectToDatabase();

  await connection.execute(query, [spotId]);
  connection.end();

  return spotId;
};

export const getSpotByIdFromDb = async (spotId: number): Promise<Spot> => {
  const query = getSpotByIdQuery;
  const connection = await connectToDatabase();

  const [rows] = await connection.execute<RowDataPacket[]>(query, [spotId]);
  connection.end();

  return rows[0] as Spot;
};

export const updateSpotByIdFromDb = async (
  spot: Spot,
  userId: number,
): Promise<number> => {
  const query = updateSpotByIdQuery;
  const { name, id } = spot;
  const connection = await connectToDatabase();

  await connection.execute<RowDataPacket[]>(query, [name, userId, id]);
  const [rows] = await connection.execute<RowDataPacket[]>(
    getLastInsertedIdQuery,
  );
  connection.end();

  return rows[0].id as number;
};
