import { DomainEvent } from '@/core/events';
import { Appointment } from '../entities/appointment';

export class AppointmentCreatedEvent extends DomainEvent {
  constructor(
    public readonly appointment: Appointment,
    public readonly createdBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'AppointmentCreated';
  }

  get aggregateId(): string {
    return this.appointment.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      appointment: {
        id: this.appointment.id.toString(),
        spaceId: this.appointment.spaceId,
        userId: this.appointment.userId,
        startTime: this.appointment.startTime,
        endTime: this.appointment.endTime,
        status: this.appointment.status,
        createdAt: this.appointment.createdAt,
      },
      createdBy: this.createdBy,
    };
  }
}
