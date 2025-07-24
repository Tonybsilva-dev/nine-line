import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EventBus } from '@/core/events';
import { AppointmentApprovedEvent } from '../../../domain/events';
import { EntityNotFoundError, InvalidOperationError } from '@/core/errors';
import { AuthorizationService } from '@/modules/rbac/domain/services/authorization.service';
import { APPOINTMENT_PERMISSIONS } from '@/modules/rbac/domain/entities/permissions';

interface ApproveAppointmentDTO {
  appointmentId: string;
  adminId: string;
  approvedBy: string;
}

export class ApproveAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: ApproveAppointmentDTO): Promise<Appointment> {
    // Verificar permissão de aprovação
    await this.authorizationService.requirePermission(
      data.adminId,
      APPOINTMENT_PERMISSIONS.APPROVE,
    );

    const appointment = await this.appointmentRepository.findById(
      data.appointmentId,
    );
    if (!appointment) {
      throw new EntityNotFoundError('Appointment', data.appointmentId);
    }

    // Verificar se o appointment está pendente
    if (appointment.status !== 'PENDING') {
      throw new InvalidOperationError(
        'Only pending appointments can be approved',
      );
    }

    // Aprovar o appointment
    appointment.approve();
    await this.appointmentRepository.update(appointment);

    // Disparar evento de appointment aprovado se eventBus estiver disponível
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
