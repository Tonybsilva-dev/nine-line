import { PaginationParams } from '@/core/repositories/pagination-params';
import { UserRoleAssignment } from '../entities';

export interface UserRoleRepository {
  create(userRole: UserRoleAssignment): Promise<void>;
  findById(id: string): Promise<UserRoleAssignment | null>;
  findByUserId(userId: string): Promise<UserRoleAssignment[]>;
  findByRoleId(roleId: string): Promise<UserRoleAssignment[]>;
  findActiveByUserId(userId: string): Promise<UserRoleAssignment[]>;
  findAll(
    params: PaginationParams,
  ): Promise<{ total: number; userRoles: UserRoleAssignment[] }>;
  update(userRole: UserRoleAssignment): Promise<void>;
  delete(id: string): Promise<void>;
  deleteByUserIdAndRoleId(userId: string, roleId: string): Promise<void>;
  count(): Promise<number>;
  countByUserId(userId: string): Promise<number>;
}
