import { NextFunction, Request, Response } from 'express';
import {
  createSpotToDb,
  deleteSpotFromDb,
  getSpotByIdFromDb,
  getUserSpotsFromDb,
  updateSpotByIdFromDb,
} from '../repository.ts/spots';
import { ErrorHandler } from '../models/errors';
import { CreateSpot } from '../models/spots';

export const createSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;
    const spotName: string = req.body.name;
    const spot: CreateSpot = { name: spotName, userId };

    const spotId = await createSpotToDb(spot);

    res.send({ id: spotId, spotName }).status(201);
  } catch (error) {
    const errorMessage = 'Error creating spot';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);
    next(errorFormatted);
  }
};

export const getUserSpots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;
    const spots = await getUserSpotsFromDb(userId);
    res.send(spots).status(200);
  } catch (error) {
    const errorMessage = 'Error getting spots';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);
    next(errorFormatted);
  }
};

export const deleteSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const spotId = parseInt(id);

    const { userId } = req.body;

    const spot = await getSpotByIdFromDb(spotId);
    if (spot.createdBy !== userId) {
      const errorMessage = 'Unauthorized';
      const status = 401;
      const errorFormatted = new ErrorHandler(errorMessage, status);
      return next(errorFormatted);
    }

    await deleteSpotFromDb(spotId);
    const deleteSpotResponse = `Spot with id ${spotId} deleted`;
    res.send(deleteSpotResponse).status(200);
  } catch (error) {
    const errorMessage = 'Error deleting spot';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);
    next(errorFormatted);
  }
};

export const updateSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const spotId = parseInt(id);
    const { userId } = req.body;

    const spot = await getSpotByIdFromDb(spotId);
    if (spot.createdBy !== userId) {
      const errorMessage = 'Unauthorized';
      const status = 401;
      const errorFormatted = new ErrorHandler(errorMessage, status);
      return next(errorFormatted);
    }

    const requestSpotData: CreateSpot = req.body;
    const spotUpdated = Object.assign(spot, requestSpotData);

    await updateSpotByIdFromDb(spotUpdated, userId);

    const updatedSpot = await getSpotByIdFromDb(spotId);

    res.send(updatedSpot).status(200);
  } catch (error) {
    const errorMessage = 'Error updating spot';
    const status = 500;
    const errorFormatted = new ErrorHandler(errorMessage, status);
    next(errorFormatted);
  }
};
