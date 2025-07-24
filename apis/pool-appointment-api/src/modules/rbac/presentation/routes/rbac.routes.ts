import { Router } from 'express';
import {
  assignRoleController,
  getRolesController,
  revokeRoleController,
  getUserPermissionsController,
} from '../controllers';

const rbacRoutes = Router();

// RBAC Routes
rbacRoutes.post('/assign-role', assignRoleController);
rbacRoutes.get('/roles', getRolesController);
rbacRoutes.post('/revoke-role', revokeRoleController);
rbacRoutes.get('/user-permissions/:userId', getUserPermissionsController);

// TODO: Adicionar outros controllers quando implementados
// rbacRoutes.post('/create-role', createRoleController);

export { rbacRoutes };
