// Domain
export * from './domain/entities/user';
export * from './domain/entities/value-objects/password';
export * from './domain/repositories/user.repository';
export * from './domain/events/user-created.event';
export * from './domain/events/user-updated.event';
export * from './domain/events/user-deleted.event';

// Application
export * from './application/use-cases/create-user/create-user.use-case';
export * from './application/use-cases/update-user/update-user.use-case';
export * from './application/use-cases/delete-user/delete-user.use-case';
export * from './application/use-cases/find-user/find-user-by-id.use-case';
export * from './application/use-cases/find-user/find-user-by-email.use-case';
// export * from './application/use-cases/count/count-users.use-case'; // Arquivo não existe
export * from './application/events/user-created.handler';
export * from './application/events/user-updated.handler';
export * from './application/events/user-deleted.handler';
export * from './application/events/user-events.config';

// Infrastructure
export * from './infra/repositories/prisma-user.repository';
// export * from './infra/seeders/user-seeder'; // Arquivo não existe

// Presentation
export * from './presentation';
