import { Request } from 'express';
import { Error404 } from '../../utils/errors/httpError';

export default (req: Request) => {
  throw new Error404({ name: 'NOT_FOUND', message: `Route ${req.path} not found` });
};
