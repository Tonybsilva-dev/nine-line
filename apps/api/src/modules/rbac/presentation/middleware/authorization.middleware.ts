import { Request, Response, NextFunction } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';

export const requirePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseMapper.error(
          res,
          401,
          'Authentication required',
          'UNAUTHORIZED',
        );
      }

      // TODO: Inject AuthorizationService via DI
      // For now, we'll use a simple implementation
      // const authService = container.get(AuthorizationService);
      // await authService.requirePermission(userId, permission);

      // Placeholder for demonstration
      // In production, you should inject the AuthorizationService
      // TODO: Implement permission check using 'permission'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _permission = permission;

      next();
    } catch {
      return ResponseMapper.error(
        res,
        403,
        'Insufficient permissions',
        'FORBIDDEN',
      );
    }
  };
};

export const requireRoleLevel = (requiredLevel: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseMapper.error(
          res,
          401,
          'Authentication required',
          'UNAUTHORIZED',
        );
      }

      // TODO: Inject AuthorizationService via DI
      // const authService = container.get(AuthorizationService);
      // await authService.requireRoleLevel(userId, requiredLevel);

      // Placeholder for demonstration
      // TODO: Implement role level check using 'requiredLevel'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _requiredLevel = requiredLevel;

      next();
    } catch {
      return ResponseMapper.error(
        res,
        403,
        'Insufficient role level',
        'FORBIDDEN',
      );
    }
  };
};

export const requireResourceOwnership = (
  resourceType: string,
  resourceIdParam: string,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseMapper.error(
          res,
          401,
          'Authentication required',
          'UNAUTHORIZED',
        );
      }

      const resourceId = req.params[resourceIdParam];
      if (!resourceId) {
        return ResponseMapper.error(
          res,
          400,
          'Resource ID is required',
          'BAD_REQUEST',
        );
      }

      // TODO: Implement resource ownership check
      // Example: check if the appointment belongs to the user

      next();
    } catch {
      return ResponseMapper.error(
        res,
        403,
        'Access denied to this resource',
        'FORBIDDEN',
      );
    }
  };
};
