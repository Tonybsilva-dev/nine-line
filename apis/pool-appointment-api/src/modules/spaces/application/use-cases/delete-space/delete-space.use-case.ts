import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EntityNotFoundError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { SpaceDeletedEvent } from '../../../domain/events';

export class DeleteSpaceUseCase {
  constructor(
    private spaceRepository: SpaceRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(id: string): Promise<void> {
    const space = await this.spaceRepository.findById(id);
    if (!space) throw new EntityNotFoundError('Space', id);

    await this.spaceRepository.delete(id);

    // Disparar evento de space deletado se eventBus estiver disponível
    if (this.eventBus) {
      const spaceDeletedEvent = new SpaceDeletedEvent(space);
      await this.eventBus.publish(spaceDeletedEvent);
    }
  }
}
