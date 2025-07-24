import { UserRoleAssignment } from '@/modules/rbac/domain/entities';
import { UserRoleRepository } from '@/modules/rbac/domain/repositories/user-role.repository';

export class InMemoryUserRoleRepository implements UserRoleRepository {
  private assignments: UserRoleAssignment[] = [];

  async create(assignment: UserRoleAssignment) {
    this.assignments.push(assignment);
  }

  async findById(id: string) {
    return this.assignments.find((a) => a.id.toString() === id) || null;
  }

  async findByUserId(userId: string) {
    return this.assignments.filter((a) => a.userId === userId);
  }

  async findByRoleId(roleId: string) {
    return this.assignments.filter((a) => a.roleId === roleId);
  }

  async findActiveByUserId(userId: string) {
    const now = new Date();
    return this.assignments.filter(
      (a) => a.userId === userId && (!a.expiresAt || a.expiresAt > now),
    );
  }

  async findAll() {
    return { total: this.assignments.length, userRoles: this.assignments };
  }

  async delete(id: string) {
    this.assignments = this.assignments.filter((a) => a.id.toString() !== id);
  }

  async deleteByUserIdAndRoleId(userId: string, roleId: string) {
    this.assignments = this.assignments.filter(
      (a) => !(a.userId === userId && a.roleId === roleId),
    );
  }

  async count() {
    return this.assignments.length;
  }

  async update(assignment: UserRoleAssignment) {
    const idx = this.assignments.findIndex(
      (a) => a.id.toString() === assignment.id.toString(),
    );
    if (idx !== -1) this.assignments[idx] = assignment;
  }

  async countByUserId(userId: string) {
    return this.assignments.filter((a) => a.userId === userId).length;
  }
}
