// Base errors
export { BaseError } from './base-error';

// Domain errors
export {
  DomainError,
  EntityNotFoundError,
  DuplicateEntityError,
  InvalidOperationError,
} from './domain-error';

// Validation errors
export {
  ValidationError,
  InvalidInputError,
  RequiredFieldError,
} from './validation-error';

// Business errors
export {
  BusinessError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RateLimitError,
} from './business-error';

// Legacy error (mantendo compatibilidade)
export { ResourceNotFoundError } from './resource-not-found-error';

// Error mapper
export { ErrorMapper } from './error-mapper';
