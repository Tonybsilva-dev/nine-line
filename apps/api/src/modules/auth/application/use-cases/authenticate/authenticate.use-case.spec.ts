import { describe, it, expect, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate.use-case';

import { User } from '@/modules/users/domain/entities/user';
import { Password } from '@/modules/users/domain/entities/value-objects/password';
import { InMemoryRefreshTokenRepository } from '../../../../../../test/repositories/in-memory-refresh-token-repository';
import { InMemoryUserRepository } from '../../../../../../test/repositories/in-memory-users-repository';

describe('AuthenticateUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let refreshTokenRepository: InMemoryRefreshTokenRepository;
  let useCase: AuthenticateUseCase;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    refreshTokenRepository = InMemoryRefreshTokenRepository.getInstance();
    refreshTokenRepository.clear();
    useCase = new AuthenticateUseCase(userRepository, refreshTokenRepository);
    // Create valid user
    const password = await Password.create('password123');
    const user = User.create({
      name: 'Test User',
      email: 'test@example.com',
      password,
      status: 'ACTIVE',
      role: 'USER',
    });
    await userRepository.create(user);
  });

  it('should authenticate valid user and return tokens', async () => {
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.user.email).toBe('test@example.com');
  });

  it('should fail with incorrect password', async () => {
    await expect(() =>
      useCase.execute({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow();
  });

  it('should fail with non-existent email', async () => {
    await expect(() =>
      useCase.execute({
        email: 'nonexistent@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow();
  });
});
