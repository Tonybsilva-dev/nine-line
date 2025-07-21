import { EventHandler } from '@/core/events';
import { AppointmentUpdatedEvent } from '../../domain/events/appointment-updated.event';
import { logger } from '@/config/logger';

export class AppointmentUpdatedHandler
  implements EventHandler<AppointmentUpdatedEvent>
{
  async handle(event: AppointmentUpdatedEvent): Promise<void> {
    logger.info({
      type: 'appointment_updated_handler',
      eventId: event.eventId,
      appointmentId: event.appointment.id.toString(),
      spaceId: event.appointment.spaceId,
      userId: event.appointment.userId,
      updatedBy: event.updatedBy,
      changes: event.changes,
    });

    // Aqui você pode adicionar lógicas como:
    // - Invalidar cache do appointment
    // - Notificar usuários sobre mudanças
    // - Registrar auditoria
    // - Atualizar calendários

    // Exemplo: Invalidar cache
    await this.invalidateAppointmentCache(event.appointment.id.toString());

    // Exemplo: Registrar auditoria
    await this.recordAppointmentUpdateAudit(event);
  }

  private async invalidateAppointmentCache(
    appointmentId: string,
  ): Promise<void> {
    // Simulação de invalidação de cache
    logger.info({
      type: 'appointment_cache_invalidated',
      appointmentId,
    });
  }

  private async recordAppointmentUpdateAudit(
    event: AppointmentUpdatedEvent,
  ): Promise<void> {
    // Simulação de registro de auditoria
    logger.info({
      type: 'appointment_update_audit',
      appointmentId: event.appointment.id.toString(),
      updatedBy: event.updatedBy,
      changes: event.changes,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
