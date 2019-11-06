import { NextFunction, Request, Response } from 'express';
import { default as httpError } from '../../utils/errors/httpError';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  const responseError = httpError(error);
  res.status(responseError.status).send(responseError);
};
