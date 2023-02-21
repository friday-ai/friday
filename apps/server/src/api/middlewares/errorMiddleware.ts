import { NextFunction, Request, Response } from 'express';
import httpError from '../../utils/httpError';

export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const responseError = httpError(error);
  res.status(responseError.status).send(responseError);
};
