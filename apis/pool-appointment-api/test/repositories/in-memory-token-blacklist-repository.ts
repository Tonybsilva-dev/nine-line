import { TokenBlacklistRepository } from '@/modules/auth/infra/repositories/token-blacklist.repository';

export class InMemoryTokenBlacklistRepository
  implements TokenBlacklistRepository
{
  private blacklist = new Set<string>();

  async add(token: string): Promise<void> {
    this.blacklist.add(token);
  }

  async has(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }
}
