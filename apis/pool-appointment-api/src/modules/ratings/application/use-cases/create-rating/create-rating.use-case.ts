import { RatingRepository } from '../../../domain/repositories/rating-repository';
import { Rating } from '../../../domain/entities/rating';
import { UpdateSpaceAverageRating } from '../../../domain/services/update-space-average-rating';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EntityNotFoundError, ForbiddenError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { RatingCreatedEvent } from '../../../domain/events';

interface CreateRatingDTO {
  spaceId: string;
  userId: string;
  score: number;
  comment?: string;
}

export class CreateRatingUseCase {
  private updateSpaceAverageRating: UpdateSpaceAverageRating;

  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly eventBus?: EventBus,
  ) {
    this.updateSpaceAverageRating = new UpdateSpaceAverageRating(
      ratingRepository,
      spaceRepository,
    );
  }

  async execute(
    data: CreateRatingDTO,
    userRole: string,
    authenticatedUserId: string,
  ): Promise<Rating> {
    if (userRole !== 'USER') {
      throw new ForbiddenError('Only users with USER role can create ratings.');
    }
    if (data.userId !== authenticatedUserId) {
      throw new ForbiddenError('Users can only create ratings for themselves.');
    }

    const space = await this.spaceRepository.findById(data.spaceId);
    if (!space) {
      throw new EntityNotFoundError('Space', data.spaceId);
    }

    const rating = Rating.create({
      spaceId: data.spaceId,
      userId: data.userId,
      score: data.score,
      comment: data.comment,
    });

    await this.ratingRepository.create(rating);
    await this.updateSpaceAverageRating.execute(data.spaceId);

    // Trigger rating created event if eventBus is available
    if (this.eventBus) {
      const ratingCreatedEvent = new RatingCreatedEvent(rating);
      await this.eventBus.publish(ratingCreatedEvent);
    }

    return rating;
  }
}
