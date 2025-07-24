import { RoleRepository } from '@/modules/rbac/domain/repositories/role.repository';
import { Role } from '@/modules/rbac/domain/entities/role';

export class InMemoryRoleRepository implements RoleRepository {
  private roles: Role[] = [];

  async create(role: Role) {
    this.roles.push(role);
  }

  async findById(id: string) {
    return this.roles.find((r) => r.id.toString() === id) || null;
  }

  async findByName(name: string) {
    return this.roles.find((r) => r.name === name) || null;
  }

  async findAll() {
    return { total: this.roles.length, roles: this.roles };
  }

  async update(role: Role) {
    const idx = this.roles.findIndex(
      (r) => r.id.toString() === role.id.toString(),
    );
    if (idx !== -1) this.roles[idx] = role;
  }

  async delete(id: string) {
    this.roles = this.roles.filter((r) => r.id.toString() !== id);
  }

  async count() {
    return this.roles.length;
  }

  async findByLevel(level: number) {
    return this.roles.filter((r) => r.level === level);
  }
}
