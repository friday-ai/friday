import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Action router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/action')
export default class ActionRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create an action
   * @param {Request} req
   * @param {Response} res
   * @memberof ActionRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const action = await this.friday.action.create(req.body);
    res.status(201).json(action);
  }

  /**
   * Update an action
   * @param {Request} req
   * @param {Response} res
   * @memberof ActionRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const action = await this.friday.action.update(req.body);
    res.json(action);
  }

  /**
   * Delete an action
   * @param {Request} req
   * @param {Response} res
   * @memberof ActionRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.action.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all actions
   * @param {Request} req
   * @param {Response} res
   * @memberof ActionRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const actions = await this.friday.action.getAll();
    res.json(actions);
  }

  /**
   * Get action by id
   * @param {Request} req
   * @param {Response} res
   * @memberof ActionRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const action = await this.friday.action.getById(req.params.id);
    res.json(action);
  }

}
