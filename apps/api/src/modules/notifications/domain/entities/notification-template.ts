import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type TemplateType = 'EMAIL' | 'SMS' | 'PUSH';

export interface NotificationTemplateProps {
  name: string;
  type: TemplateType;
  subject?: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class NotificationTemplate extends Entity<NotificationTemplateProps> {
  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get subject() {
    return this.props.subject;
  }

  get body() {
    return this.props.body;
  }

  get variables() {
    return this.props.variables;
  }

  get isActive() {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  updateSubject(subject: string) {
    this.props.subject = subject;
    this.touch();
  }

  updateBody(body: string) {
    this.props.body = body;
    this.touch();
  }

  updateVariables(variables: string[]) {
    this.props.variables = variables;
    this.touch();
  }

  activate() {
    this.props.isActive = true;
    this.touch();
  }

  deactivate() {
    this.props.isActive = false;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<
      NotificationTemplateProps,
      'isActive' | 'createdAt' | 'updatedAt'
    >,
    id?: UniqueEntityID,
  ) {
    const template = new NotificationTemplate(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return template;
  }
}
