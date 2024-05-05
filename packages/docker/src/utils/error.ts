import logger from "@friday-ai/logger";
import type { ErrorType } from "./interfaces";

//      ____                                        __                                          __     _     __
//     / __ \  ___   _____  ____    _____  ____ _  / /_  ____    _____   _____         __  __  / /_   (_)   / /   _____
//    / / / / / _ \ / ___/ / __ \  / ___/ / __ `/ / __/ / __ \  / ___/  / ___/        / / / / / __/  / /   / /   / ___/
//   / /_/ / /  __// /__  / /_/ / / /    / /_/ / / /_  / /_/ / / /     (__  )        / /_/ / / /_   / /   / /   (__  )
//  /_____/  \___/ \___/  \____/ /_/     \__,_/  \__/  \____/ /_/     /____/         \__,_/  \__/  /_/   /_/   /____/
//

/**
 * base core error class
 * @class Error
 * @extends {Error}
 */
export class CoreError extends Error {
  public name: string;
  public message: string;
  public cause?: Error;
  public metadata?: any;

  constructor(err: ErrorType) {
    super(err.message);
    this.name = err.name;
    this.message = err.message;
    this.cause = err.cause;
    this.metadata = err.metadata;
  }
}

/**
 * Not found error class
 * @class NotFoundError
 * @extends {CoreError}
 */
export class NotFoundError extends CoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Platform not compatible error class
 * @class PlatformNotCompatible
 * @extends {CoreError}
 */
export class PlatformNotCompatible extends CoreError {
  constructor(err: ErrorType) {
    super(err);
  }
}

/**
 * Create an error instance
 * @param {ErrorType} err - Options of error like name, message, cause and metadata.
 * @returns {CoreError} Resolve with an error instance.
 */
export default function error(err: ErrorType): CoreError {
  switch (err.cause?.constructor) {
    case NotFoundError:
      return new NotFoundError(err);
    case PlatformNotCompatible:
      return new PlatformNotCompatible(err);
    default:
      return new CoreError(err);
  }
}

//      ____                                        __                                   ____                  __                    _
//     / __ \  ___   _____  ____    _____  ____ _  / /_  ____    _____   _____          / __/  ____ _  _____  / /_  ____    _____   (_)  ___    _____
//    / / / / / _ \ / ___/ / __ \  / ___/ / __ `/ / __/ / __ \  / ___/  / ___/         / /_   / __ `/ / ___/ / __/ / __ \  / ___/  / /  / _ \  / ___/
//   / /_/ / /  __// /__  / /_/ / / /    / /_/ / / /_  / /_/ / / /     (__  )         / __/  / /_/ / / /__  / /_  / /_/ / / /     / /  /  __/ (__  )
//  /_____/  \___/ \___/  \____/ /_/     \__,_/  \__/  \____/ /_/     /____/         /_/     \__,_/  \___/  \__/  \____/ /_/     /_/   \___/ /____/
//

export const Catch = () => (_: any, __: string, descriptor: PropertyDescriptor) => {
  // save a reference to the original method
  const originalMethod = descriptor.value;

  // rewrite original method with custom wrapper
  descriptor.value = function f(...args: any[]) {
    try {
      const result = originalMethod.apply(this, args);

      // check if method is asynchronous
      if (result && typeof result.then === "function" && typeof result.catch === "function") {
        // return promise
        return result.catch((e: any) => {
          logger.error(e);
          throw error({
            name: e.name,
            message: e.message,
            cause: e,
            metadata: args,
          });
        });
      }

      // return actual result
      return result;
    } catch (e) {
      logger.error(e);
      throw error({
        name: e.name,
        message: e.message,
        cause: e,
        metadata: args,
      });
    }
  };

  return descriptor;
};
