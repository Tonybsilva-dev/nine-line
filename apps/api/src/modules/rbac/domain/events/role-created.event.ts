import { DomainEvent } from '@/core/events';
import { Role } from '../entities/role';

export class RoleCreatedEvent extends DomainEvent {
  constructor(
    public readonly role: Role,
    public readonly createdBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'RoleCreated';
  }

  get aggregateId(): string {
    return this.role.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      role: {
        id: this.role.id.toString(),
        name: this.role.name,
        description: this.role.description,
        level: this.role.level,
        isSystem: this.role.isSystem,
        createdAt: this.role.createdAt,
      },
      createdBy: this.createdBy,
    };
  }
}
