import { EventHandler } from '@/core/events';
import { AppointmentDeletedEvent } from '../../domain/events/appointment-deleted.event';
import { logger } from '@/config/logger';

export class AppointmentDeletedHandler
  implements EventHandler<AppointmentDeletedEvent>
{
  async handle(event: AppointmentDeletedEvent): Promise<void> {
    logger.info({
      type: 'appointment_deleted_handler',
      eventId: event.eventId,
      appointmentId: event.appointment.id.toString(),
      spaceId: event.appointment.spaceId,
      userId: event.appointment.userId,
      deletedBy: event.deletedBy,
    });

    // Aqui você pode adicionar lógicas como:
    // - Invalidar cache do appointment
    // - Notificar usuários sobre cancelamento
    // - Registrar auditoria
    // - Liberar horário no espaço

    // Exemplo: Invalidar cache
    await this.invalidateAppointmentCache(event.appointment.id.toString());

    // Exemplo: Registrar auditoria
    await this.recordAppointmentDeletionAudit(event);

    // Exemplo: Liberar horário
    await this.releaseTimeSlot(event.appointment);
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

  private async recordAppointmentDeletionAudit(
    event: AppointmentDeletedEvent,
  ): Promise<void> {
    // Simulação de registro de auditoria
    logger.info({
      type: 'appointment_deletion_audit',
      appointmentId: event.appointment.id.toString(),
      deletedBy: event.deletedBy,
      timestamp: event.occurredAt.toISOString(),
    });
  }

  private async releaseTimeSlot(appointment: {
    spaceId: string;
    startTime: Date;
    endTime: Date;
  }): Promise<void> {
    // Simulação de liberação de horário
    logger.info({
      type: 'time_slot_released',
      spaceId: appointment.spaceId,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
    });
  }
}
