import { UserRepository } from '../../../domain/repositories/user-repository';
import { User } from '../../../domain/entities/user';
import { UnauthorizedError } from '@/core/errors';

interface AuthenticateDTO {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: AuthenticateDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status === 'INACTIVE' || user.deletedAt) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await user.password.compare(data.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    return user;
  }
}
