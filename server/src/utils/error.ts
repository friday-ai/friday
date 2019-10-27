'use strict';

interface ErrorType {
  name: string;
  message: string;
  cause?: Error;
  metadata?: Object;
}

/**
 * Generic error class
 * @class GenericError
 * @extends {Error}
 */
export class GenericError extends Error {

  public options: ErrorType;

  constructor(options: ErrorType) {
    super(options.message);
    this.options = options;
  }
}

/**
 * Authentification error class
 * @class AuthError
 * @extends {Error}
 */
export class AuthError extends Error {

  public options: ErrorType;

  constructor(options: ErrorType) {
    super(options.message);
    this.options = options;
  }
}

/**
 * Not found error class
 * @class NotFoundError
 * @extends {Error}
 */
export class NotFoundError extends Error {

  public options: ErrorType;

  constructor(options: ErrorType) {
    super(options.message);
    this.options = options;
  }
}

/**
 * Database unique constraint error class
 * @class DatabaseUniqueConstraintError
 * @extends {Error}
 */
export class DatabaseUniqueConstraintError extends Error {

  public options: ErrorType;

  constructor(options: ErrorType) {
    super(options.message);
    this.options = options;
  }
}

/**
 * Database validation error class
 * @class DatabaseValidationError
 * @extends {Error}
 */
export class DatabaseValidationError extends Error {

  public options: ErrorType;

  constructor(options: ErrorType) {
    super(options.message);
    this.options = options;
  }
}

/**
 * Bad parameters error class
 * @class BadParametersError
 * @extends {Error}
 */
export class BadParametersError extends Error {

  public options: ErrorType;

  constructor(options: ErrorType) {
    super(options.message);
    this.options = options;
  }
}

/**
 * Create an error instance
 * @param {ErrorType} options - Options of error like name, message, cause and metadata.
 * @returns {Error} Resolve with an error instance.
 */
export default function error(options: ErrorType): Error {

  switch (options.name) {
    case 'SequelizeValidationError':
      return new DatabaseValidationError(options);
    case 'SequelizeUniqueConstraintError':
      return new DatabaseUniqueConstraintError(options);
    default:
      return new GenericError(options);
  }
}
