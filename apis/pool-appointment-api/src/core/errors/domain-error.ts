import { BaseError } from './base-error';

export class DomainError extends BaseError {
  constructor(message: string, code: string = 'DOMAIN_ERROR') {
    super(message, 400, code);
  }
}

export class EntityNotFoundError extends BaseError {
  constructor(entityName: string, identifier?: string) {
    const message = identifier
      ? `${entityName} with identifier '${identifier}' not found`
      : `${entityName} not found`;

    super(message, 404, 'ENTITY_NOT_FOUND');
  }
}

export class DuplicateEntityError extends BaseError {
  constructor(entityName: string, field: string, value: string) {
    super(
      `${entityName} with ${field} '${value}' already exists`,
      409,
      'DUPLICATE_ENTITY',
    );
  }
}

export class InvalidOperationError extends BaseError {
  constructor(message: string) {
    super(message, 400, 'INVALID_OPERATION');
  }
}
