import { Router } from 'express';
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/ensure-authenticated';

import {
  createUserController,
  deleteUserController,
  findAllUsersController,
  findUserByIdController,
  updateUserController,
} from '../controllers';

import { validateCreateUser, validateUpdateUser } from '../validators';
import { validatePagination, validateParamsId } from '@/core/validators';

export const userRoutes = Router();

// Public route
userRoutes.post('/', validateCreateUser, createUserController);

// Protected routes
userRoutes.get(
  '/',
  ensureAuthenticated,
  validatePagination,
  findAllUsersController,
);
userRoutes.get(
  '/:id',
  ensureAuthenticated,
  validateParamsId,
  findUserByIdController,
);
userRoutes.put(
  '/:id',
  ensureAuthenticated,
  validateParamsId,
  validateUpdateUser,
  updateUserController,
);
userRoutes.delete(
  '/:id',
  ensureAuthenticated,
  validateParamsId,
  deleteUserController,
);
