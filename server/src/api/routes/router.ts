/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Glob from 'glob';
import 'reflect-metadata';
import { Router } from 'express';
import { RouteDefinition } from '../../utils/decorators/route';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import Friday from '../../core/friday';
import aclMiddleware from '../middlewares/aclMiddleware';

/**
 * Express router
 * @description Create express router object.
 * @param {Object} friday - Friday object.
 * @returns {Object} Return express router object.
 * @example
 * router(friday);
 */
export default function router(friday: Friday): Router {
  const routerObject = Router();

  const routers = Glob
    .sync('**/*.ts', { cwd: `${__dirname}/` })
    .map((filename) => require(`./${filename}`).default)
    .filter((routerClass) => routerClass !== undefined)
    .filter((routerClass) => Reflect.hasOwnMetadata('prefix', routerClass));

  routers.forEach((RouterClass) => {
    const instance = new RouterClass(friday);
    const prefix = Reflect.getMetadata('prefix', RouterClass);
    const routes = <RouteDefinition[]>Reflect.getMetadata('routes', RouterClass);

    routes.forEach((route) => {
      const routerParams = [];

      routerParams.push(aclMiddleware(route.aclMethod, route.aclResource));

      // if the route is marked as authenticated
      if (route.authenticated) {
        routerParams.push(authMiddleware(friday));
        // add acl middleware after auth middleware
        routerParams.push(aclMiddleware(route.aclMethod, route.aclResource));
      }
      // if the route need rate limit
      if (route.rateLimit) {
        routerParams.push(rateLimitMiddleware);
      }

      // add the controller at the end of the array
      // wrapped on async middleware
      routerParams.push(asyncMiddleware(instance[route.methodName]));

      routerObject[route.requestMethod](`/api${prefix}${route.path}`, ...routerParams);
    });
  });

  return routerObject;
}
