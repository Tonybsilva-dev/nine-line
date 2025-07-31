import { Router } from 'express';
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/ensure-authenticated';
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

userRoutes.post('/', validateCreateUser, createUserController);

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
  updateUserController,
);
userRoutes.delete(
  '/:id',
  ensureAuthenticated,
  validateDeleteUser,
  deleteUserController,
);
