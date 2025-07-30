import { DomainEvent } from '@/core/events';
import { Space } from '../entities/space';

export class SpaceDeletedEvent extends DomainEvent {
  constructor(
    public readonly space: Space,
    public readonly deletedBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'SpaceDeleted';
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
      deletedBy: this.deletedBy,
    };
  }
}
