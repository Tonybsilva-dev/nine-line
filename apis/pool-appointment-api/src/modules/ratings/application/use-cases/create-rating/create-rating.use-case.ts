import { RatingRepository } from '../../../domain/repositories/rating-repository';
import { Rating } from '../../../domain/entities/rating';
import { UpdateSpaceAverageRating } from '../../../domain/services/update-space-average-rating';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EntityNotFoundError } from '@/core/errors';
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

  async execute(data: CreateRatingDTO): Promise<Rating> {
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

    // Disparar evento de rating criado se eventBus estiver disponível
    if (this.eventBus) {
      const ratingCreatedEvent = new RatingCreatedEvent(rating);
      await this.eventBus.publish(ratingCreatedEvent);
    }

    return rating;
  }
}
