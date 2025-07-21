import { UserRepository } from '../../../domain/repositories/user-repository';
import { User } from '../../../domain/entities/user';
import { UserStatus, UserRole } from '@prisma/client';
import { Password } from '@/modules/users/domain/entities/value-objects/password';
import { DuplicateEntityError } from '@/core/errors';
import { EventBus } from '@/core/events';
import { UserCreatedEvent } from '../../../domain/events';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser)
      throw new DuplicateEntityError('User', 'email', data.email);

    const password = await Password.create(data.password);

    const user = User.create({
      name: data.name,
      email: data.email,
      password,
      status: data.status,
      role: data.role,
    });

    await this.userRepository.create(user);

    if (this.eventBus) {
      const userCreatedEvent = new UserCreatedEvent(user);
      await this.eventBus.publish(userCreatedEvent);
    }

    return user;
  }
}
