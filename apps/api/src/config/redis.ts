import Redis from 'ioredis';
import { ENV_CONFIG } from './env';
import { logger } from './logger';

class RedisManager {
  private static instance: RedisManager;
  private client: Redis | null = null;
  private isConnected = false;

  private constructor() {
    this.initializeRedis();
  }

  private initializeRedis(): void {
    try {
      // Configuração básica e robusta do Redis
      this.client = new Redis(ENV_CONFIG.REDIS_URL, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        keepAlive: 30000,
        connectTimeout: 10000,
        commandTimeout: 5000,
        enableReadyCheck: true,
        enableOfflineQueue: false,
      });

      this.setupEventListeners();
    } catch (error) {
      logger.error('Failed to initialize Redis:', error);
      this.client = null;
    }
  }

  private setupEventListeners(): void {
    if (!this.client) return;

    this.client.on('error', (error: Error) => {
      logger.error('Redis connection error:', error);
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      logger.info('Redis connected successfully');
      this.isConnected = true;
    });

    this.client.on('ready', () => {
      logger.info('Redis is ready');
      this.isConnected = true;
    });

    this.client.on('close', () => {
      logger.warn('Redis connection closed');
      this.isConnected = false;
    });

    this.client.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });
  }

  public static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  public getClient(): Redis | null {
    return this.client;
  }

  public isRedisConnected(): boolean {
    return this.isConnected && this.client !== null;
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.client) {
        logger.warn('Redis client not available');
        return null;
      }
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Error getting cache:', error);
      return null;
    }
  }

  public async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      if (!this.client) {
        logger.warn('Redis client not available');
        return;
      }
      const stringValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setex(key, ttl, stringValue);
      } else {
        await this.client.set(key, stringValue);
      }
    } catch (error) {
      logger.error('Error setting cache:', error);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      if (!this.client) {
        logger.warn('Redis client not available');
        return;
      }
      await this.client.del(key);
    } catch (error) {
      logger.error('Error deleting cache:', error);
    }
  }

  public async ping(): Promise<boolean> {
    try {
      if (!this.client) {
        return false;
      }
      const result = await this.client.ping();
      return result === 'PONG';
    } catch (error) {
      logger.error('Redis ping failed:', error);
      return false;
    }
  }
}

export const redisManager = RedisManager.getInstance();
export const redis = redisManager.getClient();

export const getCache = async <T>(key: string): Promise<T | null> => {
  return redisManager.get<T>(key);
};

export const setCache = async <T>(
  key: string,
  value: T,
  ttl?: number,
): Promise<void> => {
  return redisManager.set<T>(key, value, ttl);
};

export const deleteCache = async (key: string): Promise<void> => {
  return redisManager.del(key);
};

export const isRedisAvailable = (): boolean => {
  return redisManager.isRedisConnected();
};

export const waitForRedisReady = async (timeout = 10000) => {
  const start = Date.now();
  while (!redisManager.isRedisConnected()) {
    if (Date.now() - start > timeout) {
      throw new Error('Timeout waiting for Redis to be ready');
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};
