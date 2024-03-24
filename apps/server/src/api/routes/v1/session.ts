import { Request, Response } from 'express';
import { FridayRouter, Get, Patch, Post } from '../../../utils/decorators/route';
import Friday from '../../../core/friday';

/**
 * Session router
 */
@FridayRouter('/v1/session')
export default class SessionRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Get access token
   * @apiPrivate
   * @apiName getAccessToken
   * @apiDescription This route allows you to get a new access token for an session
   * @api {post} /api/v1/session/access_token
   * @apiParam {String} refreshToken Refresh token of the session
   * @apiGroup Session
   * @apiVersion 1.0.0
   */
  @Post({
    path: '/access_token',
    authenticated: false,
    rateLimit: true,
    aclMethod: 'create',
    aclResource: 'session',
  })
  getAccessToken = async (req: Request, res: Response) => {
    const session = await this.friday.session.getAccessToken(req.body.refreshToken);
    res.json(session);
  };

  /**
   * Revoke an session
   * @apiName revoke
   * @apiDescription This route allows you to revoke an session
   * @api {patch} /api/v1/session/revoke/:id
   * @apiGroup Session
   * @apiVersion 1.0.0
   */
  @Patch({
    path: '/revoke/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'session',
  })
  revoke = async (req: Request, res: Response) => {
    const session = await this.friday.session.revoke(req.params.id);
    res.json(session);
  };

  /**
   * List All sessions
   * @apiName listAll
   * @apiDescription This route allows you to List All sessions
   * @api {get} /api/v1/session
   * @apiGroup Session
   * @apiVersion 1.0.0
   */
  @Get({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'session',
  })
  listAll = async (req: Request, res: Response) => {
    const sessions = await this.friday.session.listAll(req.query);
    res.json(sessions);
  };
}
