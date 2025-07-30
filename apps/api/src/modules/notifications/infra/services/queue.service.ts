import { Queue, Worker, Job } from 'bullmq';
import { logger } from '@/config/logger';

export interface QueueJobData {
  notificationId: string;
  templateId: string;
  userId: string;
  payload: Record<string, unknown>;
}

export class QueueService {
  private notificationQueue: Queue;
  private notificationWorker: Worker;

  constructor() {
    this.notificationQueue = new Queue('notifications', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    });

    this.notificationWorker = new Worker(
      'notifications',
      async (job: Job<QueueJobData>) => {
        await this.processNotificationJob(job);
      },
      {
        connection: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
    );

    this.setupWorkerEvents();
  }

  async add(jobName: string, data: QueueJobData): Promise<void> {
    await this.notificationQueue.add(jobName, data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  private async processNotificationJob(job: Job<QueueJobData>): Promise<void> {
    const { notificationId, templateId, userId, payload } = job.data;

    logger.info({
      type: 'notification_job_started',
      jobId: job.id,
      notificationId,
      templateId,
      userId,
    });

    try {
      // Aqui você injetaria o NotificationService para processar a notificação
      // Por enquanto, vamos apenas logar
      logger.info({
        type: 'notification_job_processed',
        jobId: job.id,
        notificationId,
        templateId,
        userId,
        payload,
      });
    } catch (error) {
      logger.error({
        type: 'notification_job_error',
        jobId: job.id,
        notificationId,
        templateId,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  private setupWorkerEvents(): void {
    this.notificationWorker.on('completed', (job: Job) => {
      logger.info({
        type: 'notification_job_completed',
        jobId: job.id,
      });
    });

    this.notificationWorker.on('failed', (job: Job | undefined, err: Error) => {
      logger.error({
        type: 'notification_job_failed',
        jobId: job?.id,
        error: err.message,
      });
    });

    this.notificationWorker.on('error', (err: Error) => {
      logger.error({
        type: 'notification_worker_error',
        error: err.message,
      });
    });
  }

  async close(): Promise<void> {
    await this.notificationQueue.close();
    await this.notificationWorker.close();
  }
}
