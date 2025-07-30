import { DomainEvent } from '@/core/events';
import { User } from '../entities/user';

export class UserUpdatedEvent extends DomainEvent {
  constructor(
    public readonly user: User,
    public readonly updatedBy?: string,
    public readonly changes?: Record<string, unknown>,
  ) {
    super();
  }

  get eventName(): string {
    return 'UserUpdated';
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
        updatedAt: this.user.updatedAt,
      },
      updatedBy: this.updatedBy,
      changes: this.changes,
    };
  }
}
