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

      // TODO: Injetar AuthorizationService via DI
      // Por enquanto, vamos usar uma implementação simples
      // const authService = container.get(AuthorizationService);
      // await authService.requirePermission(userId, permission);

      // Placeholder para demonstração
      // Em produção, você deve injetar o AuthorizationService
      // TODO: Implementar verificação de permissão usando 'permission'
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

      // TODO: Injetar AuthorizationService via DI
      // const authService = container.get(AuthorizationService);
      // await authService.requireRoleLevel(userId, requiredLevel);

      // Placeholder para demonstração
      // TODO: Implementar verificação de nível de role usando 'requiredLevel'
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

      // TODO: Implementar verificação de propriedade do recurso
      // Exemplo: verificar se o appointment pertence ao usuário

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
