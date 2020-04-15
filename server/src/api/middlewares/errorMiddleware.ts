import { NextFunction, Request, Response } from 'express';
import httpError from '../../utils/errors/httpError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  const responseError = httpError(error);
  res.status(responseError.status).send(responseError);
};
