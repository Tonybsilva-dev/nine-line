import { EventHandler } from '@/core/events';
import { RoleCreatedEvent } from '../../domain/events';
import { logger } from '@/config/logger';

export class RoleCreatedHandler implements EventHandler<RoleCreatedEvent> {
  async handle(event: RoleCreatedEvent): Promise<void> {
    logger.info('Role created', {
      event: 'RoleCreated',
      roleId: event.role.id.toString(),
      roleName: event.role.name,
      roleLevel: event.role.level,
      isSystem: event.role.isSystem,
      createdBy: event.createdBy,
      createdAt: event.role.createdAt,
    });

    // Aqui você pode adicionar lógicas como:
    // - Registrar auditoria
    // - Notificar administradores
    // - Atualizar cache de roles
    // - Sincronizar com outros sistemas
  }
}
