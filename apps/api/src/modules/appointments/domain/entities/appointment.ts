import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AppointmentStatus } from '@prisma/client';

export interface AppointmentProps {
  userId: string;
  spaceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
  originalDate?: Date;
  changeCount: number;
  maxChanges: number;
}

export class Appointment extends Entity<AppointmentProps> {
  get userId(): string {
    return this.props.userId;
  }

  get spaceId(): string {
    return this.props.spaceId;
  }

  get date(): Date {
    return this.props.date;
  }

  get startTime(): Date {
    return this.props.startTime;
  }

  get endTime(): Date {
    return this.props.endTime;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  get cancelReason(): string | undefined {
    return this.props.cancelReason;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get originalDate(): Date | undefined {
    return this.props.originalDate;
  }

  get changeCount(): number {
    return this.props.changeCount;
  }

  get maxChanges(): number {
    return this.props.maxChanges;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  updateStatus(status: AppointmentStatus): void {
    this.props.status = status;
    this.touch();
  }

  approve(): void {
    this.props.status = 'CONFIRMED';
    this.touch();
  }

  reject(): void {
    this.props.status = 'REJECTED';
    this.touch();
  }

  cancel(reason?: string): void {
    this.props.status = 'CANCELLED';
    this.props.cancelReason = reason;
    this.touch();
  }

  updateDateTime(date: Date, startTime: Date, endTime: Date): void {
    const now = new Date();
    if (date < now) {
      throw new Error('Cannot schedule for past dates');
    }

    if (startTime >= endTime) {
      throw new Error('Start time must be earlier than end time');
    }

    // Validar regras de alteração
    this.validateChangeRules(date);

    // Definir data original se for a primeira alteração
    if (!this.props.originalDate) {
      this.props.originalDate = this.props.date;
    }

    // Incrementar contador de alterações
    this.props.changeCount += 1;

    this.props.date = date;
    this.props.startTime = startTime;
    this.props.endTime = endTime;
    this.touch();
  }

  private validateChangeRules(newDate: Date): void {
    // Verificar se não excedeu o número máximo de alterações
    if (this.props.changeCount >= this.props.maxChanges) {
      throw new Error(
        `Maximum number of changes (${this.props.maxChanges}) exceeded`,
      );
    }

    // Verificar se a nova data não excede 2 meses da data original
    if (this.props.originalDate) {
      const twoMonthsFromOriginal = new Date(this.props.originalDate);
      twoMonthsFromOriginal.setMonth(twoMonthsFromOriginal.getMonth() + 2);

      if (newDate > twoMonthsFromOriginal) {
        throw new Error(
          'Cannot reschedule more than 2 months from the original date',
        );
      }
    }
  }

  static create(
    props: Optional<
      AppointmentProps,
      'createdAt' | 'updatedAt' | 'status' | 'changeCount' | 'maxChanges'
    >,
    id?: UniqueEntityID,
  ): Appointment {
    const appointment = new Appointment(
      {
        ...props,
        status: props.status ?? 'PENDING',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        changeCount: props.changeCount ?? 0,
        maxChanges: props.maxChanges ?? 3,
      },
      id,
    );

    return appointment;
  }
}
