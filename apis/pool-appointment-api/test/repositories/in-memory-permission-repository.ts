import { PermissionRepository } from '@/modules/rbac/domain/repositories/permission.repository';
import { Permission } from '@/modules/rbac/domain/entities/permission';
import { PaginationParams } from '@/core/repositories/pagination-params';

export class InMemoryPermissionRepository implements PermissionRepository {
  private permissions: Permission[] = [];

  async create(permission: Permission) {
    this.permissions.push(permission);
  }

  async findById(id: string) {
    return this.permissions.find((p) => p.id.toString() === id) || null;
  }

  async findByName(name: string) {
    return this.permissions.find((p) => p.name === name) || null;
  }

  async findAll(params: PaginationParams) {
    const { page = 1, perPage = 10 } = params;
    const skip = (page - 1) * perPage;
    const permissions = this.permissions.slice(skip, skip + perPage);

    return {
      total: this.permissions.length,
      permissions,
    };
  }

  async update(permission: Permission) {
    const index = this.permissions.findIndex(
      (p) => p.id.toString() === permission.id.toString(),
    );
    if (index !== -1) {
      this.permissions[index] = permission;
    }
  }

  async delete(id: string) {
    this.permissions = this.permissions.filter((p) => p.id.toString() !== id);
  }

  async count() {
    return this.permissions.length;
  }
}
