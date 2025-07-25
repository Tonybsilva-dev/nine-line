import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { EntityNotFoundError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { AppointmentDeletedEvent } from '../../../domain/events';

export class DeleteAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new EntityNotFoundError('Appointment', id);
    }

    await this.appointmentRepository.delete(id);

    // Trigger appointment deleted event if eventBus is available
    if (this.eventBus) {
      const appointmentDeletedEvent = new AppointmentDeletedEvent(appointment);
      await this.eventBus.publish(appointmentDeletedEvent);
    }
  }
}
