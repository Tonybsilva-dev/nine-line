import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EntityNotFoundError } from '@/core/errors';
import { AppointmentStatus } from '@prisma/client';
import { EventBus } from '@/core/events';
import { AppointmentUpdatedEvent } from '../../../domain/events';

interface UpdateAppointmentDTO {
  id: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  status?: AppointmentStatus;
}

export class UpdateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: UpdateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(data.id);

    if (!appointment) {
      throw new EntityNotFoundError('Appointment', data.id);
    }

    const changes: Record<string, unknown> = {};

    if (data.status) {
      changes.status = data.status;
      appointment.updateStatus(data.status);
    }

    if (data.date && data.startTime && data.endTime) {
      changes.date = data.date;
      changes.startTime = data.startTime;
      changes.endTime = data.endTime;
      appointment.updateDateTime(data.date, data.startTime, data.endTime);
    }

    await this.appointmentRepository.update(appointment);

    // Disparar evento de appointment atualizado se eventBus estiver disponível
    if (this.eventBus && Object.keys(changes).length > 0) {
      const appointmentUpdatedEvent = new AppointmentUpdatedEvent(
        appointment,
        undefined,
        changes,
      );
      await this.eventBus.publish(appointmentUpdatedEvent);
    }

    return appointment;
  }
}
