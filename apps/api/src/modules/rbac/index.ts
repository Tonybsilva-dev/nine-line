// Domain
export * from './domain/entities/role';
export * from './domain/entities/permission';
export * from './domain/entities/user-role-assignment';
export * from './domain/repositories/role.repository';
export * from './domain/repositories/permission.repository';
export * from './domain/repositories/user-role.repository';
export * from './domain/services/authorization.service';
export * from './domain/events/role-created.event';
export * from './domain/events/role-assigned.event';
export * from './domain/events/role-revoked.event';

// Application
export * from './application/use-cases/assign-role/assign-role.use-case';
export * from './application/use-cases/revoke-role/revoke-role.use-case';
export * from './application/use-cases/get-user-permissions/get-user-permissions.use-case';
export * from './application/use-cases/check-permission/check-permission.use-case';
export * from './application/use-cases/create-role/create-role.use-case';
export * from './application/events/role-created.handler';
export * from './application/events/role-assigned.handler';
export * from './application/events/role-revoked.handler';

// Infrastructure
export * from './infra/repositories/prisma-role.repository';
export * from './infra/repositories/prisma-permission.repository';
export * from './infra/repositories/prisma-user-role.repository';

// Presentation
export * from './presentation';
