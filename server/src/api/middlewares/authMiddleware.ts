import { NextFunction, Request, Response } from 'express';
import httpError, { Error401 } from '../../utils/errors/httpError';
import Friday from '../../core/friday';

export default (friday: Friday) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      await friday.session.validateAccessToken(token);
      next();
    } else {
      throw new Error401({ name: 'UNAUTHORIZED', message: 'No authorization header found.' });
    }
  } catch (e) {
    const responseError = httpError(e);
    res.status(responseError.status).send(responseError);
  }
};
