import { Router } from 'express';
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';
import { requireUserPermission } from '@/modules/rbac/presentation/middlewares/authorization.middleware';
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

// Create user - public endpoint (registration)
userRoutes.post('/', validateCreateUser, createUserController);

// Get all users - requires user:read:all permission (admin only)
userRoutes.get(
  '/',
  ensureAuthenticated,
  requireUserPermission('read:all'),
  validateFindAllUsers,
  findAllUsersController,
);

// Get user by ID - requires user:read:own or user:read:all
userRoutes.get(
  '/:id',
  ensureAuthenticated,
  requireUserPermission('read:own'),
  validateFindUserById,
  findUserByIdController,
);

// Update user - requires user:update:own or user:update:all
userRoutes.put(
  '/:id',
  ensureAuthenticated,
  requireUserPermission('update:own'),
  validateFindUserById,
  validateUpdateUser,
  updateUserController,
);

// Delete user - requires user:delete permission (admin only)
userRoutes.delete(
  '/:id',
  ensureAuthenticated,
  requireUserPermission('delete'),
  validateDeleteUser,
  deleteUserController,
);
