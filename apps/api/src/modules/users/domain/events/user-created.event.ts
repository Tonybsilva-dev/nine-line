import { DomainEvent } from '@/core/events';
import { User } from '../entities/user';

export class UserCreatedEvent extends DomainEvent {
  constructor(
    public readonly user: User,
    public readonly createdBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'UserCreated';
  }

  get aggregateId(): string {
    return this.user.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      user: {
        id: this.user.id.toString(),
        name: this.user.name,
        email: this.user.email,
        status: this.user.status,
        role: this.user.role,
        createdAt: this.user.createdAt,
      },
      createdBy: this.createdBy,
    };
  }
}
