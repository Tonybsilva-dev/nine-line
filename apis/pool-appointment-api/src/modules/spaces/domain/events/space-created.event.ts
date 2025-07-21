import { DomainEvent } from '@/core/events';
import { Space } from '../entities/space';

export class SpaceCreatedEvent extends DomainEvent {
  constructor(
    public readonly space: Space,
    public readonly createdBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'SpaceCreated';
  }

  get aggregateId(): string {
    return this.space.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      space: {
        id: this.space.id.toString(),
        title: this.space.title,
        description: this.space.description,
        hostId: this.space.hostId,
        averageRating: this.space.averageRating,
        createdAt: this.space.createdAt,
      },
      createdBy: this.createdBy,
    };
  }
}
