import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { Appointment } from '../../../domain/entities/appointment';
import { EntityNotFoundError, InvalidOperationError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { AppointmentCreatedEvent } from '../../../domain/events';

interface CreateAppointmentDTO {
  userId: string;
  spaceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly userRepository: UserRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new EntityNotFoundError('User', data.userId);
    }

    const space = await this.spaceRepository.findById(data.spaceId);
    if (!space) {
      throw new EntityNotFoundError('Space', data.spaceId);
    }

    // Validação: Não é possível agendar para datas passadas
    const now = new Date();
    if (data.date < now) {
      throw new InvalidOperationError(
        'Não é possível agendar para datas passadas',
      );
    }

    // Validação: Horário de início deve ser menor que o horário de fim
    if (data.startTime >= data.endTime) {
      throw new InvalidOperationError(
        'O horário de início deve ser menor que o horário de fim',
      );
    }

    const appointment = Appointment.create({
      userId: data.userId,
      spaceId: data.spaceId,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    await this.appointmentRepository.create(appointment);

    // Disparar evento de appointment criado se eventBus estiver disponível
    if (this.eventBus) {
      const appointmentCreatedEvent = new AppointmentCreatedEvent(appointment);
      await this.eventBus.publish(appointmentCreatedEvent);
    }

    return appointment;
  }
}
