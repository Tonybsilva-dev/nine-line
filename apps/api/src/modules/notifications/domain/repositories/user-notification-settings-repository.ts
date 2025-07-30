import { UserNotificationSettings } from '../entities/user-notification-settings';

export interface UserNotificationSettingsRepository {
  create(settings: UserNotificationSettings): Promise<void>;
  findByUserId(userId: string): Promise<UserNotificationSettings | null>;
  update(settings: UserNotificationSettings): Promise<void>;
  delete(userId: string): Promise<void>;
}
