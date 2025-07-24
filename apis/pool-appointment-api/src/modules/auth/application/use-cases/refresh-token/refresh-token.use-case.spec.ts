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
    // Limpar o singleton antes de cada teste
    refreshTokenRepository = InMemoryRefreshTokenRepository.getInstance();
    refreshTokenRepository.clear();

    userRepository = new InMemoryUserRepository();
    useCase = new RefreshTokenUseCase(refreshTokenRepository, userRepository);
    userId = 'user-1';

    // Criar usuário
    const password = await Password.create('senha123');
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
        iat: Math.floor(Date.now() / 1000) - 3600, // Timestamp de 1 hora atrás
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

  it('deve gerar novo access e refresh token com refresh token válido', async () => {
    const result = await useCase.execute({ refreshToken: validRefreshToken });
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.refreshToken).not.toBe(validRefreshToken);
  });

  it('deve falhar com refresh token inválido', async () => {
    await expect(() =>
      useCase.execute({ refreshToken: 'token-invalido' }),
    ).rejects.toThrow();
  });

  it('deve falhar com refresh token revogado', async () => {
    await refreshTokenRepository.revoke(validRefreshToken);
    await expect(() =>
      useCase.execute({ refreshToken: validRefreshToken }),
    ).rejects.toThrow();
  });
});
