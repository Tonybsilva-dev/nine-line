import { DomainEvent } from '@/core/events';
import { Space } from '../entities/space';

export class SpaceUpdatedEvent extends DomainEvent {
  constructor(
    public readonly space: Space,
    public readonly updatedBy?: string,
    public readonly changes?: Record<string, unknown>,
  ) {
    super();
  }

  get eventName(): string {
    return 'SpaceUpdated';
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
        updatedAt: this.space.updatedAt,
      },
      updatedBy: this.updatedBy,
      changes: this.changes,
    };
  }
}
