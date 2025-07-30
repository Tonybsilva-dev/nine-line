import { PaginationParams } from '@/core/repositories/pagination-params';
import { Permission } from '../entities/permission';

export interface PermissionRepository {
  create(permission: Permission): Promise<void>;
  findById(id: string): Promise<Permission | null>;
  findByName(name: string): Promise<Permission | null>;
  findAll(
    params: PaginationParams,
  ): Promise<{ total: number; permissions: Permission[] }>;
  update(permission: Permission): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
