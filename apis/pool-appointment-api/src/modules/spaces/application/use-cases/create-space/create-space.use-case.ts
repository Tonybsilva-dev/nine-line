import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Space } from '@/modules/spaces/domain/entities/space';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { EventBus } from '@/core/events';
import { SpaceCreatedEvent } from '../../../domain/events';

interface CreateSpaceDTO {
  title: string;
  description: string;
  photos: string[];
  rules: string;
  hostId: string;
}

export class CreateSpaceUseCase {
  constructor(
    private spaceRepository: SpaceRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: CreateSpaceDTO): Promise<{ space: Space }> {
    const space = Space.create(
      {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      new UniqueEntityID(),
    );

    await this.spaceRepository.create(space);

    // Disparar evento de space criado se eventBus estiver disponível
    if (this.eventBus) {
      const spaceCreatedEvent = new SpaceCreatedEvent(space);
      await this.eventBus.publish(spaceCreatedEvent);
    }

    return { space };
  }
}
