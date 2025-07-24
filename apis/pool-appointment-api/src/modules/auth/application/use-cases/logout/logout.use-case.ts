import { TokenBlacklistRepository } from '@/modules/auth/infra/repositories';

interface LogoutDTO {
  token: string;
}

export class LogoutUseCase {
  constructor(private readonly blacklistRepository: TokenBlacklistRepository) {}

  async execute(data: LogoutDTO): Promise<void> {
    await this.blacklistRepository.add(data.token);
  }
}
