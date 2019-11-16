import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Trigger router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/trigger')
export default class TriggerRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a trigger
   * @param {Request} req
   * @param {Response} res
   * @memberof TriggerRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const trigger = await this.friday.trigger.create(req.body);
    res.status(201).json(trigger);
  }

  /**
   * Update a trigger
   * @param {Request} req
   * @param {Response} res
   * @memberof TriggerRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const trigger = await this.friday.trigger.update(req.body);
    res.json(trigger);
  }

  /**
   * Delete a trigger
   * @param {Request} req
   * @param {Response} res
   * @memberof TriggerRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.trigger.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all triggers
   * @param {Request} req
   * @param {Response} res
   * @memberof TriggerRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const triggers = await this.friday.trigger.getAll();
    res.json(triggers);
  }

  /**
   * Get trigger by id
   * @param {Request} req
   * @param {Response} res
   * @memberof TriggerRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const trigger = await this.friday.trigger.getById(req.params.id);
    res.json(trigger);
  }

}
