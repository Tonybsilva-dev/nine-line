export type RefreshTokenProps = {
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  revokedAt?: Date | null;
};

export class RefreshToken {
  constructor(public props: RefreshTokenProps) {}

  get isActive() {
    return !this.props.revokedAt && new Date() < this.props.expiresAt;
  }
}
