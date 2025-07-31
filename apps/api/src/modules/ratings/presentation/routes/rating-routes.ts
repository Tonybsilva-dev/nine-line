import { Router } from 'express';
import { ratingRateLimit } from '../middlewares';
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

/**
 * Rotas de Ratings
 *
 * POST   /api/ratings           - Cria uma nova avaliação
 * PUT    /api/ratings/:id       - Atualiza uma avaliação existente
 * DELETE /api/ratings/:id       - Remove uma avaliação
 * GET    /api/ratings/:id       - Busca uma avaliação por ID
 * GET    /api/ratings/space/:spaceId - Lista avaliações de um espaço
 * GET    /api/ratings/user/:userId   - Lista avaliações de um usuário
 */
export const ratingRoutes = Router();

ratingRoutes.post(
  '/',
  validateCreateRating,
  ratingRateLimit(5, 60000),
  createRatingController,
);
ratingRoutes.put(
  '/:id',
  validateFindRatingById,
  validateUpdateRating,
  ratingRateLimit(3, 60000),
  updateRatingController,
);
ratingRoutes.delete(
  '/:id',
  validateDeleteRating,
  ratingRateLimit(2, 60000),
  deleteRatingController,
);
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
