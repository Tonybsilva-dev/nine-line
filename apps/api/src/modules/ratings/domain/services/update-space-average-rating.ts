import { RatingRepository } from '../repositories/rating-repository';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EntityNotFoundError } from '@/core/errors';

export class UpdateSpaceAverageRating {
  constructor(
    private ratingRepository: RatingRepository,
    private spaceRepository: SpaceRepository,
  ) {}

  async execute(spaceId: string): Promise<void> {
    const averageRating =
      await this.ratingRepository.getAverageScoreBySpaceId(spaceId);
    const space = await this.spaceRepository.findById(spaceId);

    if (!space) {
      throw new EntityNotFoundError('Space', spaceId);
    }

    space.averageRating = averageRating;
    await this.spaceRepository.update(space);
  }
}
