import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type NotificationType = 'EMAIL' | 'SMS' | 'PUSH';
export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface NotificationProps {
  userId: string;
  type: NotificationType;
  templateId: string;
  status: NotificationStatus;
  payload: Record<string, unknown>;
  error?: string;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  get userId() {
    return this.props.userId;
  }

  get type() {
    return this.props.type;
  }

  get templateId() {
    return this.props.templateId;
  }

  get status() {
    return this.props.status;
  }

  get payload() {
    return this.props.payload;
  }

  get error() {
    return this.props.error;
  }

  get sentAt() {
    return this.props.sentAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  markAsSent() {
    this.props.status = 'SENT';
    this.props.sentAt = new Date();
    this.touch();
  }

  markAsFailed(error: string) {
    this.props.status = 'FAILED';
    this.props.error = error;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<NotificationProps, 'status' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...props,
        status: props.status ?? 'PENDING',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return notification;
  }
}
