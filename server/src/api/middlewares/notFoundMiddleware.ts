import { Error404 } from '../../utils/errors/httpError';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  throw new Error404({name: 'NOT_FOUND', message: `Route ${req.path} not found`});
};
