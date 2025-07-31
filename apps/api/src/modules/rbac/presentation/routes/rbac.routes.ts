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

rbacRoutes.post('/assign-role', validateAssignRole, assignRoleController);
rbacRoutes.get('/roles', getRolesController);
rbacRoutes.post('/revoke-role', validateRevokeRole, revokeRoleController);
rbacRoutes.get(
  '/user-permissions/:userId',
  validateGetUserPermissions,
  getUserPermissionsController,
);

export { rbacRoutes };
