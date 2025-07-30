export interface TokenBlacklistRepository {
  add(token: string): Promise<void>;
  has(token: string): Promise<boolean>;
}
