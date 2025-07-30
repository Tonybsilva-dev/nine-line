import { Notification } from '../entities/notification';
import { PaginationParams } from '@/core/repositories/pagination-params';

export interface NotificationRepository {
  create(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<{ total: number; notifications: Notification[] }>;
  findByStatus(
    status: string,
    params: PaginationParams,
  ): Promise<{ total: number; notifications: Notification[] }>;
  update(notification: Notification): Promise<void>;
  delete(id: string): Promise<void>;
}
