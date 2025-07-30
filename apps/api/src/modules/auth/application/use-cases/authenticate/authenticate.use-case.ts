import { UserRepository } from '@/modules/users/domain/repositories/user.repository';

import { User } from '@/modules/users/domain/entities/user';
import { UnauthorizedError } from '@/core/errors';
import jwt from 'jsonwebtoken';
import { RefreshTokenRepository } from '@/modules/auth/infra/repositories/refresh-token.repository';
import { RefreshToken } from '@/modules/auth/domain/entities';

interface AuthenticateDTO {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(data: AuthenticateDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user || user.status !== 'ACTIVE' || user.deletedAt) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await user.password.compare(data.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        sub: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' },
    );

    // Generate refresh token
    const refreshTokenValue = jwt.sign(
      { sub: user.id.toString() },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' },
    );

    const refreshToken = new RefreshToken({
      userId: user.id.toString(),
      token: refreshTokenValue,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.refreshTokenRepository.save(refreshToken);

    return { accessToken, refreshToken: refreshTokenValue, user };
  }
}
