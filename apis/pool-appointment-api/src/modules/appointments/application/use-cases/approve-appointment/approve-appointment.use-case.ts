import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EventBus } from '@/core/events';
import { AppointmentApprovedEvent } from '../../../domain/events';
import { EntityNotFoundError, InvalidOperationError } from '@/core/errors';
import { AuthorizationService } from '@/modules/rbac/domain/services/authorization.service';
import { ForbiddenError } from '@/core/errors';

interface ApproveAppointmentDTO {
  appointmentId: string;
  adminId: string;
  approvedBy: string;
  userId: string;
  userRole: string;
}

export class ApproveAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: ApproveAppointmentDTO): Promise<Appointment> {
    if (!data.userId) {
      throw new ForbiddenError('User authentication required');
    }
    // Only MANAGER or ADMIN can approve appointments
    if (data.userRole !== 'MANAGER' && data.userRole !== 'ADMIN') {
      throw new ForbiddenError(
        'Only MANAGER or ADMIN can approve appointments',
      );
    }

    const appointment = await this.appointmentRepository.findById(
      data.appointmentId,
    );
    if (!appointment) {
      throw new EntityNotFoundError('Appointment', data.appointmentId);
    }

    // Verify if appointment is pending
    if (appointment.status !== 'PENDING') {
      throw new InvalidOperationError(
        'Only pending appointments can be approved',
      );
    }

    // Approve appointment
    appointment.approve();
    await this.appointmentRepository.update(appointment);

    // trigger appointment approved event if eventBus is available
    if (this.eventBus) {
      const appointmentApprovedEvent = new AppointmentApprovedEvent(
        appointment,
        data.approvedBy,
      );
      await this.eventBus.publish(appointmentApprovedEvent);
    }

    return appointment;
  }
}
