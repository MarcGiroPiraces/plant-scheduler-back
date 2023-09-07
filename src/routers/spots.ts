import express from 'express';
import { auth } from '../middlewares/auth';
import {
  checkCreateSpotBodyMiddleware,
  checkUpdateSpotBodyMiddleware,
} from '../middlewares/spots';
import {
  createSpot,
  deleteSpot,
  getUserSpots,
  updateSpot,
} from '../controllers/spots';

export const router = express.Router();

router.post('/', auth, checkCreateSpotBodyMiddleware, createSpot);

router.get('/', auth, getUserSpots);

router.delete('/:id', auth, deleteSpot);

router.put('/:id', auth, checkUpdateSpotBodyMiddleware, updateSpot);

export default router;
