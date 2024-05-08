import { type RequestHandler, Router } from "express";
import "reflect-metadata";

import type Friday from "../../core/friday";
import type { RouteDefinition } from "../../utils/decorators/route";
import aclMiddleware from "../middlewares/aclMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import rateLimitMiddleware from "../middlewares/rateLimitMiddleware";

import routersV1 from "./v1/index";

const env = process.env.NODE_ENV || "production";

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

  for (const RouterClass of routersV1) {
    const instance = new RouterClass(friday);
    const prefix = Reflect.getMetadata("prefix", RouterClass);
    const routes = <RouteDefinition[]>Reflect.getMetadata("routes", RouterClass);

    for (const route of routes) {
      const routerParams = [];

      // if the route is marked as authenticated
      if (route.authenticated) {
        routerParams.push(authMiddleware(friday));
        // add acl middleware after auth middleware
        routerParams.push(aclMiddleware(route.aclMethod, route.aclResource));
      }
      // if the route need rate limit
      if (route.rateLimit && env === "production") {
        routerParams.push(rateLimitMiddleware);
      }

      const handler = instance[route.methodName as keyof typeof instance] as RequestHandler;

      // add the controller at the end of the array
      // wrapped on async middleware
      routerParams.push(asyncMiddleware(handler));

      routerObject[route.requestMethod](`/api${prefix}${route.path}`, ...routerParams);
    }
  }

  return routerObject;
}
