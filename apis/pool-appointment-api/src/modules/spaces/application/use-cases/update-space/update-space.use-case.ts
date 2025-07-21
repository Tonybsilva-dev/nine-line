import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EntityNotFoundError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { SpaceUpdatedEvent } from '../../../domain/events';

interface UpdateSpaceDTO {
  id: string;
  title?: string;
  description?: string;
  photos?: string[];
  rules?: string;
}

export class UpdateSpaceUseCase {
  constructor(
    private spaceRepository: SpaceRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: UpdateSpaceDTO): Promise<void> {
    const space = await this.spaceRepository.findById(data.id);
    if (!space) throw new EntityNotFoundError('Space', data.id);

    const changes: Record<string, unknown> = {};

    if (data.title) {
      changes.title = data.title;
      space.title = data.title;
    }
    if (data.description) {
      changes.description = data.description;
      space.description = data.description;
    }
    if (data.photos) {
      changes.photos = data.photos;
      space.photos = data.photos;
    }
    if (data.rules) {
      changes.rules = data.rules;
      space.rules = data.rules;
    }

    await this.spaceRepository.update(space);

    // Disparar evento de space atualizado se eventBus estiver disponível
    if (this.eventBus && Object.keys(changes).length > 0) {
      const spaceUpdatedEvent = new SpaceUpdatedEvent(
        space,
        undefined,
        changes,
      );
      await this.eventBus.publish(spaceUpdatedEvent);
    }
  }
}
