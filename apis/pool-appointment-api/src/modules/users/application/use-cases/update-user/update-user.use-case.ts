import { UserRepository } from '@/modules/users/domain/repositories/user-repository';
import { UserStatus, UserRole } from '@prisma/client';
import { EntityNotFoundError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { UserUpdatedEvent } from '../../../domain/events';

interface UpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  status?: UserStatus;
  role?: UserRole;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findById(data.id);
    if (!user) throw new EntityNotFoundError('User', data.id);

    const changes: Record<string, unknown> = {};

    if (data.name) {
      changes.name = data.name;
      user.updateName(data.name);
    }
    if (data.email) {
      changes.email = data.email;
      user.updateEmail(data.email);
    }
    if (data.status) {
      changes.status = data.status;
      if (data.status === 'ACTIVE' && user.status === 'INACTIVE') {
        user.clearDeletedAt();
      }
      user.updateStatus(data.status);
    }
    if (data.role) {
      changes.role = data.role;
      user.updateRole(data.role);
    }

    await this.userRepository.update(user);

    if (this.eventBus && Object.keys(changes).length > 0) {
      const userUpdatedEvent = new UserUpdatedEvent(user, undefined, changes);
      await this.eventBus.publish(userUpdatedEvent);
    }
  }
}
