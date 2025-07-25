import { RatingRepository } from '../../../domain/repositories/rating-repository';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { UpdateSpaceAverageRating } from '../../../domain/services/update-space-average-rating';
import { EntityNotFoundError, ForbiddenError } from '@/core/errors';

interface DeleteRatingDTO {
  id: string;
}

export class DeleteRatingUseCase {
  private updateSpaceAverageRating: UpdateSpaceAverageRating;

  constructor(
    private ratingRepository: RatingRepository,
    private spaceRepository: SpaceRepository,
  ) {
    this.updateSpaceAverageRating = new UpdateSpaceAverageRating(
      ratingRepository,
      spaceRepository,
    );
  }

  async execute(
    { id }: DeleteRatingDTO,
    userRole: string,
    authenticatedUserId: string,
  ): Promise<void> {
    if (userRole !== 'USER') {
      throw new ForbiddenError('Only users with USER role can delete ratings.');
    }
    const rating = await this.ratingRepository.findById(id);

    if (!rating) {
      throw new EntityNotFoundError('Rating', id);
    }
    if (rating.userId !== authenticatedUserId) {
      throw new ForbiddenError('Users can only delete their own ratings.');
    }

    await this.ratingRepository.delete(id);
    await this.updateSpaceAverageRating.execute(rating.spaceId);
  }
}
