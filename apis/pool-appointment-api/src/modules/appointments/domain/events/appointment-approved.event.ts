import { DomainEvent } from '@/core/events';
import { Appointment } from '../entities/appointment';

export class AppointmentApprovedEvent extends DomainEvent {
  constructor(
    public readonly appointment: Appointment,
    public readonly approvedBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'AppointmentApproved';
  }

  get aggregateId(): string {
    return this.appointment.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      appointment: {
        id: this.appointment.id.toString(),
        userId: this.appointment.userId,
        spaceId: this.appointment.spaceId,
        status: this.appointment.status,
        date: this.appointment.date,
        startTime: this.appointment.startTime,
        endTime: this.appointment.endTime,
        createdAt: this.appointment.createdAt,
        updatedAt: this.appointment.updatedAt,
      },
      approvedBy: this.approvedBy,
    };
  }
}
