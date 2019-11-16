import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch } from '../../../utils/decorators/route';

/**
 * State router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/state')
export default class StateRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Set a state
   * @param {Request} req
   * @param {Response} res
   * @memberof StateRouter
   */
  @Patch({ path: '/', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const state = await this.friday.state.set(req.body);
    res.json(state);
  }

  /**
   * Get state by owner
   * @param {Request} req
   * @param {Response} res
   * @memberof StateRouter
   */
  @Get({ path: '/:owner', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const state = await this.friday.state.getByOwner(req.params.owner);
    res.json(state);
  }

}
