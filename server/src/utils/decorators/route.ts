
//      ____                                        __                                          __     _     __
//     / __ \  ___   _____  ____    _____  ____ _  / /_  ____    _____   _____         __  __  / /_   (_)   / /   _____
//    / / / / / _ \ / ___/ / __ \  / ___/ / __ `/ / __/ / __ \  / ___/  / ___/        / / / / / __/  / /   / /   / ___/
//   / /_/ / /  __// /__  / /_/ / / /    / /_/ / / /_  / /_/ / / /     (__  )        / /_/ / / /_   / /   / /   (__  )
//  /_____/  \___/ \___/  \____/ /_/     \__,_/  \__/  \____/ /_/     /____/         \__,_/  \__/  /_/   /_/   /____/
//

/**
 * Route methode enumerator
 */
enum Methodes {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete'
}

/**
 * Options interface for route definition
 */
export interface RouteDefinition {
  path: string;
  requestMethod: Methodes;
  methodName: string;
  authenticated: boolean;
  rateLimit: boolean;
}

/**
 * Params interface for route definition
 */
export interface RouteParam {
  path: string;
  authenticated: boolean;
  rateLimit: boolean;
}

/**
 * Function to build metadata routes
 * @param {*} target
 * @param {string} propertyKey
 * @param {Methodes} requestMethode
 * @param {RouteParam} options
 * @returns {Promise<RouteDefinition[]>} Resolve with route array.
 * @example
 * buildMetadataRoutes(target, propertyKey, Methodes.GET, options);
 */
function buildMetadataRoutes(target: any, propertyKey: string, requestMethode: Methodes, options: RouteParam) {
  // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
  // To prevent any further validation simply set it to an empty array here.
  if (!Reflect.hasMetadata('routes', target.constructor)) {
    Reflect.defineMetadata('routes', [], target.constructor);
  }

  // Get the routes stored so far, extend it by the new route and re-set the metadata.
  const routes = <RouteDefinition[]>Reflect.getMetadata('routes', target.constructor);

  routes.push({
    requestMethod: requestMethode,
    path: options.path,
    methodName: propertyKey,
    authenticated: options.authenticated,
    rateLimit: options.rateLimit
  });

  return routes;
}


//      ____                                        __                                   ____                  __                    _
//     / __ \  ___   _____  ____    _____  ____ _  / /_  ____    _____   _____          / __/  ____ _  _____  / /_  ____    _____   (_)  ___    _____
//    / / / / / _ \ / ___/ / __ \  / ___/ / __ `/ / __/ / __ \  / ___/  / ___/         / /_   / __ `/ / ___/ / __/ / __ \  / ___/  / /  / _ \  / ___/
//   / /_/ / /  __// /__  / /_/ / / /    / /_/ / / /_  / /_/ / / /     (__  )         / __/  / /_/ / / /__  / /_  / /_/ / / /     / /  /  __/ (__  )
//  /_____/  \___/ \___/  \____/ /_/     \__,_/  \__/  \____/ /_/     /____/         /_/     \__,_/  \___/  \__/  \____/ /_/     /_/   \___/ /____/
//


/**
 * Decorator factory for '@FridayRouter'
 * @param prefix
 * @example
 * FridayRouter('/v1/action')
 */
// tslint:disable-next-line: naming-convention
export const FridayRouter = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);

    // Since routes are set by our methods this should almost never be true (except the controller has no methods)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};

/**
 * Decorator factory for '@Get' methode
 * @param {RouteParam} options
 * @example
 * Get({ path: '/', authenticated: true, rateLimit: false })
 */
// tslint:disable-next-line: naming-convention
export const Get = (options: RouteParam) => {
  return (target: any, propertyKey: string): void => {
    const routes = buildMetadataRoutes(target, propertyKey, Methodes.GET, options);
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/**
 * Decorator factory for '@Post' methode
 * @param {RouteParam} options
 * @example
 * Post({ path: '/', authenticated: true, rateLimit: false })
 */
// tslint:disable-next-line: naming-convention
export const Post = (options: RouteParam) => {
  return (target: any, propertyKey: string): void => {
    const routes = buildMetadataRoutes(target, propertyKey, Methodes.POST, options);
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/**
 * Decorator factory for '@Patch' methode
 * @param {RouteParam} options
 * @example
 * Patch({ path: '/:id', authenticated: true, rateLimit: false })
 */
// tslint:disable-next-line: naming-convention
export const Patch = (options: RouteParam) => {
  return (target: any, propertyKey: string): void => {
    const routes = buildMetadataRoutes(target, propertyKey, Methodes.PATCH, options);
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/**
 * Decorator factory for '@Delete' methode
 * @param {RouteParam} options
 * @example
 * Delete({ path: '/:id', authenticated: true, rateLimit: false })
 */
// tslint:disable-next-line: naming-convention
export const Delete = (options: RouteParam) => {
  return (target: any, propertyKey: string): void => {
    const routes = buildMetadataRoutes(target, propertyKey, Methodes.DELETE, options);
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};
