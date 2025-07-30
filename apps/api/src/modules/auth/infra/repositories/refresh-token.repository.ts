import { RefreshToken } from '../../domain/entities/refresh-token';

export interface RefreshTokenRepository {
  save(token: RefreshToken): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revoke(token: string): Promise<void>;
}
