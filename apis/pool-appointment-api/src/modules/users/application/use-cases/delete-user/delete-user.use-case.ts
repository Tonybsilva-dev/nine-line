import { UserRepository } from '@/modules/users/domain/repositories/user-repository';
import { UserStatus } from '@prisma/client';
import { EntityNotFoundError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { UserDeletedEvent } from '../../../domain/events';

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new EntityNotFoundError('User', id);

    user.delete();
    user.updateStatus('INACTIVE' as UserStatus);

    await this.userRepository.update(user);

    // Disparar evento de usuário deletado se eventBus estiver disponível
    if (this.eventBus) {
      const userDeletedEvent = new UserDeletedEvent(user);
      await this.eventBus.publish(userDeletedEvent);
    }
  }
}
