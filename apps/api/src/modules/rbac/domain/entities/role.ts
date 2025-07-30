import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Permission } from './permission';

export type RoleProps = {
  name: string;
  description: string;
  level: number; // Hierarchy level: 0=USER, 1=MANAGER, 2=ADMIN
  isSystem: boolean;
  permissions?: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Role extends Entity<RoleProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get level() {
    return this.props.level;
  }

  get isSystem() {
    return this.props.isSystem;
  }

  get permissions() {
    return this.props.permissions || [];
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

  updateLevel(level: number) {
    this.props.level = level;
    this.touch();
  }

  addPermission(permission: Permission) {
    if (!this.props.permissions) {
      this.props.permissions = [];
    }
    this.props.permissions.push(permission);
    this.touch();
  }

  removePermission(permissionId: string) {
    if (this.props.permissions) {
      this.props.permissions = this.props.permissions.filter(
        (p) => p.id.toString() !== permissionId,
      );
      this.touch();
    }
  }

  hasPermission(permissionName: string): boolean {
    return (
      this.props.permissions?.some((p) => p.name === permissionName) || false
    );
  }

  static create(
    props: Optional<RoleProps, 'createdAt' | 'updatedAt' | 'permissions'>,
    id?: UniqueEntityID,
  ) {
    const role = new Role(
      {
        ...props,
        permissions: props.permissions || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return role;
  }
}
