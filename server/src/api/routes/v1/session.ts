import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post } from '../../../utils/decorators/route';

/**
 * Session router
 */
@FridayRouter('/v1/session')
export default class SessionRouter {
  readonly friday: any;

  constructor(friday: any) {
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
  @Post({ path: '/access_token', authenticated: false, rateLimit: true })
  getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.friday.session.getAccessToken(req.body.refreshToken);
    res.json(session);
  }

  /**
   * Revoke an session
   * @apiName revoke
   * @apiDescription This route allows you to revoke an session
   * @api {patch} /api/v1/session/revoke/:id
   * @apiGroup Session
   * @apiVersion 1.0.0
   */
  @Patch({ path: '/revoke/:id', authenticated: true, rateLimit: false })
  revoke = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.friday.session.revoke(req.params.id);
    res.json(session);
  }

  /**
   * Get all sessions
   * @apiName getAll
   * @apiDescription This route allows you to get all sessions
   * @api {get} /api/v1/session
   * @apiGroup Session
   * @apiVersion 1.0.0
   */
  @Get({ path: '/', authenticated: false, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const sessions = await this.friday.session.getAll(req.query);
    res.json(sessions);
  }

}
