import { DomainEvent } from '@/core/events';
import { User } from '../entities/user';

export class UserDeletedEvent extends DomainEvent {
  constructor(
    public readonly user: User,
    public readonly deletedBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'UserDeleted';
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
        deletedAt: this.user.deletedAt,
      },
      deletedBy: this.deletedBy,
    };
  }
}
