import { DomainEvent } from '@/core/events';
import { Rating } from '../entities/rating';

export class RatingCreatedEvent extends DomainEvent {
  constructor(
    public readonly rating: Rating,
    public readonly createdBy?: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'RatingCreated';
  }

  get aggregateId(): string {
    return this.rating.id.toString();
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      rating: {
        id: this.rating.id.toString(),
        spaceId: this.rating.spaceId,
        userId: this.rating.userId,
        score: this.rating.score,
        comment: this.rating.comment,
        createdAt: this.rating.createdAt,
      },
      createdBy: this.createdBy,
    };
  }
}
