import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type UserRoleAssignmentProps = {
  userId: string;
  roleId: string;
  assignedBy?: string;
  assignedAt?: Date;
  expiresAt?: Date | undefined;
};

export class UserRoleAssignment extends Entity<UserRoleAssignmentProps> {
  get userId() {
    return this.props.userId;
  }

  get roleId() {
    return this.props.roleId;
  }

  get assignedBy() {
    return this.props.assignedBy;
  }

  get assignedAt() {
    return this.props.assignedAt;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get isExpired(): boolean {
    if (!this.props.expiresAt) return false;
    return new Date() > this.props.expiresAt;
  }

  get isActive(): boolean {
    return !this.isExpired;
  }

  private touch() {
    // No touch needed for assignments
  }

  updateExpirationDate(expiresAt: Date | undefined) {
    this.props.expiresAt = expiresAt;
  }

  static create(
    props: Optional<UserRoleAssignmentProps, 'assignedAt'>,
    id?: UniqueEntityID,
  ) {
    const userRoleAssignment = new UserRoleAssignment(
      {
        ...props,
        assignedAt: new Date(),
      },
      id,
    );

    return userRoleAssignment;
  }
}
