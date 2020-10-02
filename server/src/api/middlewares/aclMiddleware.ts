import { NextFunction, Request, Response } from 'express';
import { AccessControl } from 'role-acl';
import httpError, { Error403 } from '../../utils/errors/httpError';
import grants from '../../config/acl';

const ac = new AccessControl(grants);
const Methods: {[key: string]: string} = {
  get: 'read',
  post: 'create',
  patch: 'update',
  delete: 'delete',
};

export default (action: string, resource: string) => async (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const permission = await ac.can(req.userRole).execute(Methods[action]).on(resource);
    if (permission.granted) {
      next();
    } else {
      // resource is forbidden for this role
      throw new Error403({ name: 'FORBIDDEN', message: `This user can't access to ${action} ${resource}.` });
    }
  } catch (e) {
    const responseError = httpError(e);
    res.status(responseError.status).send(responseError);
  }
};
