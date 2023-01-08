import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';

// eslint-disable-next-line arrow-body-style
export default (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
};
