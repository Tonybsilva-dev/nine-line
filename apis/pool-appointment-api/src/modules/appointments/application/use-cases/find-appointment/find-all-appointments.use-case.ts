import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

export class FindAllAppointmentsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(params: PaginationParams) {
    return await this.appointmentRepository.findAll(params);
  }
}
