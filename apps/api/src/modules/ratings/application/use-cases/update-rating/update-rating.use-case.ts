import { RatingRepository } from '../../../domain/repositories/rating-repository';
import { Rating } from '../../../domain/entities/rating';
import { UpdateSpaceAverageRating } from '../../../domain/services/update-space-average-rating';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EntityNotFoundError, ForbiddenError } from '@/core/errors';

interface UpdateRatingDTO {
  id: string;
  score?: number;
  comment?: string;
}

export class UpdateRatingUseCase {
  private updateSpaceAverageRating: UpdateSpaceAverageRating;

  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly spaceRepository: SpaceRepository,
  ) {
    this.updateSpaceAverageRating = new UpdateSpaceAverageRating(
      ratingRepository,
      spaceRepository,
    );
  }

  async execute(
    data: UpdateRatingDTO,
    userRole: string,
    authenticatedUserId: string,
  ): Promise<Rating> {
    if (userRole !== 'USER') {
      throw new ForbiddenError('Only users with USER role can update ratings.');
    }
    const rating = await this.ratingRepository.findById(data.id);

    if (!rating) {
      throw new EntityNotFoundError('Rating', data.id);
    }
    if (rating.userId !== authenticatedUserId) {
      throw new ForbiddenError('Users can only update their own ratings.');
    }

    if (data.score !== undefined) {
      rating.updateScore(data.score);
    }

    if (data.comment !== undefined) {
      rating.updateComment(data.comment);
    }

    await this.ratingRepository.update(rating);
    await this.updateSpaceAverageRating.execute(rating.spaceId);

    return rating;
  }
}
