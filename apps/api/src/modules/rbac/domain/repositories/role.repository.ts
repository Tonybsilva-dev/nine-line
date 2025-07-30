import { PaginationParams } from '@/core/repositories/pagination-params';
import { Role } from '../entities/role';

export interface RoleRepository {
  create(role: Role): Promise<void>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(params: PaginationParams): Promise<{ total: number; roles: Role[] }>;
  update(role: Role): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  findByLevel(level: number): Promise<Role[]>;
}
