import { Router } from 'express';
import {
  validateCreateRating,
  validateUpdateRating,
  validateFindRatingById,
  validateDeleteRating,
  validateFindRatingsBySpaceId,
  validateFindRatingsByUserId,
} from '../validators';
import { createRatingController } from '../controllers/create-rating.controller';
import { updateRatingController } from '../controllers/update-rating.controller';
import { deleteRatingController } from '../controllers/delete-rating.controller';
import { findRatingByIdController } from '../controllers/find-rating-by-id.controller';
import { findRatingsBySpaceIdController } from '../controllers/find-ratings-by-space-id.controller';
import { findRatingsByUserIdController } from '../controllers/find-ratings-by-user-id.controller';

export const ratingRoutes = Router();

ratingRoutes.post('/', validateCreateRating, createRatingController);
ratingRoutes.put(
  '/:id',
  validateFindRatingById,
  validateUpdateRating,
  updateRatingController,
);
ratingRoutes.delete('/:id', validateDeleteRating, deleteRatingController);
ratingRoutes.get('/:id', validateFindRatingById, findRatingByIdController);
ratingRoutes.get(
  '/space/:id',
  validateFindRatingsBySpaceId,
  findRatingsBySpaceIdController,
);
ratingRoutes.get(
  '/user/:id',
  validateFindRatingsByUserId,
  findRatingsByUserIdController,
);
