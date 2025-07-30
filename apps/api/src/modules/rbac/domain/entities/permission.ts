import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type PermissionProps = {
  name: string;
  description: string;
  resource: string;
  action: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Permission extends Entity<PermissionProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get resource() {
    return this.props.resource;
  }

  get action() {
    return this.props.action;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  updateDescription(description: string) {
    this.props.description = description;
    this.touch();
  }

  static create(
    props: Optional<PermissionProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const permission = new Permission(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return permission;
  }
}
