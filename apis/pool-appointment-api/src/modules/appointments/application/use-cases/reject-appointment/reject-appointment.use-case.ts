import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EventBus } from '@/core/events';
import { AppointmentRejectedEvent } from '../../../domain/events';
import { EntityNotFoundError, InvalidOperationError } from '@/core/errors';
import { AuthorizationService } from '@/modules/rbac/domain/services/authorization.service';
import { APPOINTMENT_PERMISSIONS } from '@/modules/rbac/domain/entities/permissions';

interface RejectAppointmentDTO {
  appointmentId: string;
  adminId: string;
  rejectedBy: string;
}

export class RejectAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: RejectAppointmentDTO): Promise<Appointment> {
    // Verificar permissão de rejeição
    await this.authorizationService.requirePermission(
      data.adminId,
      APPOINTMENT_PERMISSIONS.REJECT,
    );

    const appointment = await this.appointmentRepository.findById(
      data.appointmentId,
    );

    if (!appointment) {
      throw new EntityNotFoundError('Appointment', data.appointmentId);
    }

    // Verificar se o appointment pode ser rejeitado (pendente ou confirmado)
    if (
      appointment.status !== 'PENDING' &&
      appointment.status !== 'CONFIRMED'
    ) {
      throw new InvalidOperationError(
        'Only pending or confirmed appointments can be rejected',
      );
    }

    // Rejeitar o appointment
    appointment.reject();
    await this.appointmentRepository.update(appointment);

    // Disparar evento de appointment rejeitado se eventBus estiver disponível
    if (this.eventBus) {
      const appointmentRejectedEvent = new AppointmentRejectedEvent(
        appointment,
        data.rejectedBy,
      );
      await this.eventBus.publish(appointmentRejectedEvent);
    }

    return appointment;
  }
}
