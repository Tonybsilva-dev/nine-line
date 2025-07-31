import { Router } from 'express';
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/ensure-authenticated';
import { userRateLimit } from '../middlewares';

import {
  createUserController,
  deleteUserController,
  findAllUsersController,
  findUserByIdController,
  updateUserController,
} from '../controllers';

import {
  validateCreateUser,
  validateUpdateUser,
  validateFindUserById,
  validateDeleteUser,
  validateFindAllUsers,
} from '../validators';

export const userRoutes = Router();

// Public route
userRoutes.post(
  '/',
  validateCreateUser,
  userRateLimit(5, 60000),
  createUserController,
);

// Protected routes
userRoutes.get(
  '/',
  ensureAuthenticated,
  validateFindAllUsers,
  findAllUsersController,
);
userRoutes.get(
  '/:id',
  ensureAuthenticated,
  validateFindUserById,
  findUserByIdController,
);
userRoutes.put(
  '/:id',
  ensureAuthenticated,
  validateFindUserById,
  validateUpdateUser,
  userRateLimit(3, 60000), // Rate limit mais restritivo para updates
  updateUserController,
);
userRoutes.delete(
  '/:id',
  ensureAuthenticated,
  validateDeleteUser,
  userRateLimit(2, 60000), // Rate limit muito restritivo para deletes
  deleteUserController,
);
