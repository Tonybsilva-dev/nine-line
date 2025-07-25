import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EventBus } from '@/core/events';
import { AppointmentRejectedEvent } from '../../../domain/events';
import { EntityNotFoundError, InvalidOperationError } from '@/core/errors';
import { AuthorizationService } from '@/modules/rbac/domain/services/authorization.service';
import { APPOINTMENT_PERMISSIONS } from '@/modules/rbac/domain/entities/permissions';
import { ForbiddenError } from '@/core/errors';

interface RejectAppointmentDTO {
  appointmentId: string;
  adminId: string;
  rejectedBy: string;
  justification?: string;
  userId?: string;
  userRole?: string;
}

export class RejectAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: RejectAppointmentDTO): Promise<Appointment> {
    if (!data.userId) {
      throw new ForbiddenError('User authentication required');
    }
    // Only MANAGER or ADMIN can reject appointments
    if (data.userRole !== 'MANAGER' && data.userRole !== 'ADMIN') {
      throw new ForbiddenError('Only MANAGER or ADMIN can reject appointments');
    }

    // Verify if user has permission to reject appointment
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

    // Verify if appointment can be rejected (pending or confirmed)
    if (
      appointment.status !== 'PENDING' &&
      appointment.status !== 'CONFIRMED'
    ) {
      throw new InvalidOperationError(
        'Only pending or confirmed appointments can be rejected',
      );
    }

    // Reject appointment
    appointment.reject();
    await this.appointmentRepository.update(appointment);

    // Trigger appointment rejected event if eventBus is available
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
