import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface FindAllAppointmentsParams extends PaginationParams {
  hostId?: string;
  userRole?: string;
}

export class FindAllAppointmentsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(params: FindAllAppointmentsParams) {
    // Role-based filtering logic is handled in the repository
    return this.appointmentRepository.findAll(params);
  }
}
