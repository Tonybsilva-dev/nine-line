import { Router } from 'express';
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
rbacRoutes.post('/assign-role', validateAssignRole, assignRoleController);
rbacRoutes.get('/roles', getRolesController);
rbacRoutes.post('/revoke-role', validateRevokeRole, revokeRoleController);
rbacRoutes.get(
  '/user-permissions/:userId',
  validateGetUserPermissions,
  getUserPermissionsController,
);

// TODO: Add other controllers when implemented
// rbacRoutes.post('/create-role', createRoleController);

export { rbacRoutes };
