import { BaseError } from './base-error';

export class ValidationError extends BaseError {
  public readonly fieldErrors: Record<string, string[]>;

  constructor(
    message: string = 'Validation failed',
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.fieldErrors = fieldErrors;
  }

  public toJSON() {
    return {
      success: false,
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        details: this.fieldErrors,
      },
    };
  }
}

export class InvalidInputError extends BaseError {
  constructor(field: string, reason: string) {
    super(
      `Invalid input for field '${field}': ${reason}`,
      400,
      'INVALID_INPUT',
    );
  }
}

export class RequiredFieldError extends BaseError {
  constructor(field: string) {
    super(`Field '${field}' is required`, 400, 'REQUIRED_FIELD');
  }
}
