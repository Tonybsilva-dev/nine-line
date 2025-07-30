import { NotificationTemplate } from '../entities/notification-template';
import { PaginationParams } from '@/core/repositories/pagination-params';

export interface NotificationTemplateRepository {
  create(template: NotificationTemplate): Promise<void>;
  findById(id: string): Promise<NotificationTemplate | null>;
  findByName(name: string): Promise<NotificationTemplate | null>;
  findAll(
    params: PaginationParams,
  ): Promise<{ total: number; templates: NotificationTemplate[] }>;
  findByType(
    type: string,
    params: PaginationParams,
  ): Promise<{ total: number; templates: NotificationTemplate[] }>;
  update(template: NotificationTemplate): Promise<void>;
  delete(id: string): Promise<void>;
}
