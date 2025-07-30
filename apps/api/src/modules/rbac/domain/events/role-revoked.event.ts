import { DomainEvent } from '@/core/events';
import { UserRoleAssignment } from '../entities';

export class RoleRevokedEvent extends DomainEvent {
  constructor(
    public readonly userRole: UserRoleAssignment,
    public readonly revokedBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'RoleRevoked';
  }

  get aggregateId(): string {
    return this.userRole.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      userRole: {
        id: this.userRole.id.toString(),
        userId: this.userRole.userId,
        roleId: this.userRole.roleId,
        assignedBy: this.userRole.assignedBy,
        assignedAt: this.userRole.assignedAt,
        expiresAt: this.userRole.expiresAt,
      },
      revokedBy: this.revokedBy,
    };
  }
}
