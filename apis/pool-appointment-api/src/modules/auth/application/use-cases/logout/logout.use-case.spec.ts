import { describe, it, expect, beforeEach } from 'vitest';
import { LogoutUseCase } from './logout.use-case';
import { InMemoryTokenBlacklistRepository } from '../../../../../../test/repositories/in-memory-token-blacklist-repository';

describe('LogoutUseCase', () => {
  let blacklistRepo: InMemoryTokenBlacklistRepository;
  let useCase: LogoutUseCase;

  beforeEach(() => {
    blacklistRepo = new InMemoryTokenBlacklistRepository();
    useCase = new LogoutUseCase(blacklistRepo);
  });

  it('deve adicionar token à blacklist', async () => {
    const token = 'token-teste';
    await useCase.execute({ token });
    expect(await blacklistRepo.has(token)).toBe(true);
  });
});
