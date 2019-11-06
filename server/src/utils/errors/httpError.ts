import { BadParametersError, NotFoundError, DatabaseUniqueConstraintError, DatabaseValidationError, AuthError} from './coreError';
import { ErrorType } from '../interfaces';

/**
 * Base http error class
 * @class HttpError
 * @extends {Error}
 */
export class BaseHttpError extends Error {

  public status: number = 500;
  public code: string = 'SERVER_ERROR';
  public cause?: Error;
  public metadata?: Object;

  constructor(err: ErrorType) {
    super();
    this.message = err.message;
    this.cause = err.cause;
    this.metadata = err.metadata;
  }
}

/**
 * 400 http error class
 * @class Error400
 * @extends {BaseHttpError}
 */
export class Error400 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 400;
    this.code = 'BAD_REQUEST';
  }
}
/**
 * 401 http error class
 * @class Error401
 * @extends {BaseHttpError}
 */
export class Error401 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 401;
    this.code = 'UNAUTHORIZED';
  }
}
/**
 * 403 http error class
 * @class Error403
 * @extends {BaseHttpError}
 */
export class Error403 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 403;
    this.code = 'FORBIDDEN';
  }
}

/**
 * 404 http error class
 * @class Error404
 * @extends {BaseHttpError}
 */
export class Error404 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 404;
    this.code = 'NOT_FOUND';
  }
}
/**
 * 409 http error class
 * @class Error409
 * @extends {BaseHttpError}
 */
export class Error409 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 409;
    this.code = 'CONFLICT';
  }
}
/**
 * 422 http error class
 * @class Error422
 * @extends {BaseHttpError}
 */
export class Error422 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 422;
    this.code = 'UNPROCESSABLE_ENTITY';
  }
}

/**
 * 500 http error class
 * @class Error500
 * @extends {BaseHttpError}
 */
export class Error500 extends BaseHttpError {

  constructor(err: ErrorType) {
    super(err);
    this.status = 500;
    this.code = 'SERVER_ERROR';
  }
}

/**
 * Create an http error instance
 * @param {ErrorType} err - Options of error like name, message, cause and metadata.
 * @returns {BaseHttpError} Resolve with an http error instance.
 */
export default function httpError(err: ErrorType): BaseHttpError {

  switch (err.constructor) {
    case DatabaseValidationError:
      return new Error422(err);
    case DatabaseUniqueConstraintError:
      return new Error409(err);
    case BadParametersError:
      return new Error400(err);
    case Error404:
    case NotFoundError:
      return new Error404(err);
    case AuthError:
      return new Error403(err);
    default:
      return new Error500(err);
  }
}
