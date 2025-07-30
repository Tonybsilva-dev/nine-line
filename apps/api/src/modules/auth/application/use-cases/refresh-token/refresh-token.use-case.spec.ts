import { describe, it, expect, beforeEach } from 'vitest';
import { RefreshTokenUseCase } from './refresh-token.use-case';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '@/modules/auth/domain/entities/refresh-token';
import { InMemoryRefreshTokenRepository } from '../../../../../../test/repositories/in-memory-refresh-token-repository';
import { InMemoryUserRepository } from '../../../../../../test/repositories/in-memory-users-repository';
import { User } from '@/modules/users/domain/entities/user';
import { Password } from '@/modules/users/domain/entities/value-objects/password';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

const JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_REFRESH_SECRET = JWT_REFRESH_SECRET;
process.env.JWT_SECRET = 'test-access-secret';

describe('RefreshTokenUseCase', () => {
  let refreshTokenRepository: InMemoryRefreshTokenRepository;
  let userRepository: InMemoryUserRepository;
  let useCase: RefreshTokenUseCase;
  let validRefreshToken: string;
  let userId: string;

  beforeEach(async () => {
    // Clear singleton before each test
    refreshTokenRepository = InMemoryRefreshTokenRepository.getInstance();
    refreshTokenRepository.clear();

    userRepository = new InMemoryUserRepository();
    useCase = new RefreshTokenUseCase(refreshTokenRepository, userRepository);
    userId = 'user-1';

    // Create user
    const password = await Password.create('password123');
    const user = User.create(
      {
        name: 'Test User',
        email: 'test@example.com',
        password,
        status: 'ACTIVE',
        role: 'USER',
      },
      new UniqueEntityID(userId),
    );
    await userRepository.create(user);

    validRefreshToken = jwt.sign(
      {
        sub: userId,
        iat: Math.floor(Date.now() / 1000) - 3600, // Timestamp from 1 hour ago
      },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' },
    );
    const refreshToken = new RefreshToken({
      userId,
      token: validRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await refreshTokenRepository.save(refreshToken);
  });

  it('should generate new access and refresh token with valid refresh token', async () => {
    const result = await useCase.execute({ refreshToken: validRefreshToken });
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.refreshToken).not.toBe(validRefreshToken);
  });

  it('should fail with invalid refresh token', async () => {
    await expect(() =>
      useCase.execute({ refreshToken: 'invalid-token' }),
    ).rejects.toThrow();
  });

  it('should fail with revoked refresh token', async () => {
    await refreshTokenRepository.revoke(validRefreshToken);
    await expect(() =>
      useCase.execute({ refreshToken: validRefreshToken }),
    ).rejects.toThrow();
  });
});
