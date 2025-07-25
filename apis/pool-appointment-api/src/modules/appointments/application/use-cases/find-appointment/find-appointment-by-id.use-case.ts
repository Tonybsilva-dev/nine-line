import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EntityNotFoundError } from '@/core/errors';

export class FindAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new EntityNotFoundError('Appointment', id);
    }
    return appointment;
  }
}
