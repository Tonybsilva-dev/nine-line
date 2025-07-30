import { RefreshToken } from '@/modules/auth/domain/entities/refresh-token';
import { RefreshTokenRepository } from '@/modules/auth/infra/repositories/refresh-token.repository';

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private static instance: InMemoryRefreshTokenRepository;
  private tokens = new Map<string, RefreshToken>();

  private constructor() {}

  static getInstance(): InMemoryRefreshTokenRepository {
    if (!InMemoryRefreshTokenRepository.instance) {
      InMemoryRefreshTokenRepository.instance =
        new InMemoryRefreshTokenRepository();
    }
    return InMemoryRefreshTokenRepository.instance;
  }

  // Método para limpar o repositório (útil para testes)
  clear(): void {
    this.tokens.clear();
  }

  async save(token: RefreshToken): Promise<void> {
    this.tokens.set(token.props.token, token);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.tokens.get(token) || null;
  }

  async revoke(token: string): Promise<void> {
    const t = this.tokens.get(token);
    if (t) {
      t.props.revokedAt = new Date();
      this.tokens.set(token, t);
    }
  }
}
