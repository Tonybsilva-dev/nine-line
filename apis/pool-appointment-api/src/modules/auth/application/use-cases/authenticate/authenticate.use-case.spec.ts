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
    // Cria usuário válido
    const password = await Password.create('senha123');
    const user = User.create({
      name: 'Test User',
      email: 'test@example.com',
      password,
      status: 'ACTIVE',
      role: 'USER',
    });
    await userRepository.create(user);
  });

  it('deve autenticar usuário válido e retornar tokens', async () => {
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'senha123',
    });
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.user.email).toBe('test@example.com');
  });

  it('deve falhar com senha incorreta', async () => {
    await expect(() =>
      useCase.execute({ email: 'test@example.com', password: 'errada' }),
    ).rejects.toThrow();
  });

  it('deve falhar com email inexistente', async () => {
    await expect(() =>
      useCase.execute({ email: 'naoexiste@example.com', password: 'senha123' }),
    ).rejects.toThrow();
  });
});
