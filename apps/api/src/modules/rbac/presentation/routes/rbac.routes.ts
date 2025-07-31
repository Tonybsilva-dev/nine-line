import { Router } from 'express';
import { rbacRateLimit } from '../middlewares';
import {
  validateAssignRole,
  validateRevokeRole,
  validateGetUserPermissions,
} from '../validators';
import {
  assignRoleController,
  getRolesController,
  revokeRoleController,
  getUserPermissionsController,
} from '../controllers';

const rbacRoutes = Router();

// RBAC Routes
rbacRoutes.post(
  '/assign-role',
  validateAssignRole,
  rbacRateLimit(5, 60000),
  assignRoleController,
);
rbacRoutes.get('/roles', getRolesController);
rbacRoutes.post(
  '/revoke-role',
  validateRevokeRole,
  rbacRateLimit(5, 60000),
  revokeRoleController,
);
rbacRoutes.get(
  '/user-permissions/:userId',
  validateGetUserPermissions,
  getUserPermissionsController,
);

// TODO: Add other controllers when implemented
// rbacRoutes.post('/create-role', createRoleController);

export { rbacRoutes };
