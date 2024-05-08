import type { NextFunction, Request, RequestHandler, Response } from "express";

export default (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
};
