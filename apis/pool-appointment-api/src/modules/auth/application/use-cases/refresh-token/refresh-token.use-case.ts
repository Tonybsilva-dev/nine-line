import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/core/errors';
import { RefreshTokenRepository } from '@/modules/auth/infra/repositories/refresh-token.repository';
import { RefreshToken } from '@/modules/auth/domain/entities';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';

interface RefreshTokenDTO {
  refreshToken: string;
}

export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    data: RefreshTokenDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const oldToken = await this.refreshTokenRepository.findByToken(
      data.refreshToken,
    );

    if (!oldToken || !oldToken.isActive) {
      throw new UnauthorizedError('Refresh token inválido ou expirado');
    }

    // Decodificar token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any;
    try {
      payload = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new UnauthorizedError('Refresh token inválido');
    }

    // Buscar dados do usuário
    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError('Usuário não encontrado');
    }

    // Gerar novo access token
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

    // Gerar novo refresh token
    const newRefreshTokenValue = jwt.sign(
      {
        sub: user.id.toString(),
        refreshId: Math.random().toString(36).substring(7), // ID único para cada refresh
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' },
    );

    const newRefreshToken = new RefreshToken({
      userId: user.id.toString(),
      token: newRefreshTokenValue,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.refreshTokenRepository.save(newRefreshToken);
    await this.refreshTokenRepository.revoke(data.refreshToken);

    return { accessToken, refreshToken: newRefreshTokenValue };
  }
}
