import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface UserNotificationSettingsProps {
  userId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  preferredLanguage: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserNotificationSettings extends Entity<UserNotificationSettingsProps> {
  get userId() {
    return this.props.userId;
  }

  get emailEnabled() {
    return this.props.emailEnabled;
  }

  get smsEnabled() {
    return this.props.smsEnabled;
  }

  get pushEnabled() {
    return this.props.pushEnabled;
  }

  get preferredLanguage() {
    return this.props.preferredLanguage;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  updateEmailSettings(enabled: boolean) {
    this.props.emailEnabled = enabled;
    this.touch();
  }

  updateSmsSettings(enabled: boolean) {
    this.props.smsEnabled = enabled;
    this.touch();
  }

  updatePushSettings(enabled: boolean) {
    this.props.pushEnabled = enabled;
    this.touch();
  }

  updatePreferredLanguage(language: string) {
    this.props.preferredLanguage = language;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<
      UserNotificationSettingsProps,
      | 'emailEnabled'
      | 'smsEnabled'
      | 'pushEnabled'
      | 'preferredLanguage'
      | 'createdAt'
      | 'updatedAt'
    >,
    id?: UniqueEntityID,
  ) {
    const settings = new UserNotificationSettings(
      {
        ...props,
        emailEnabled: props.emailEnabled ?? true,
        smsEnabled: props.smsEnabled ?? false,
        pushEnabled: props.pushEnabled ?? true,
        preferredLanguage: props.preferredLanguage ?? 'pt-BR',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return settings;
  }
}
