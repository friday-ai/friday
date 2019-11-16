import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Script router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/script')
export default class ScriptRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a script
   * @param {Request} req
   * @param {Response} res
   * @memberof ScriptRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const script = await this.friday.script.create(req.body);
    res.status(201).json(script);
  }

  /**
   * Update a script
   * @param {Request} req
   * @param {Response} res
   * @memberof ScriptRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const script = await this.friday.script.update(req.body);
    res.json(script);
  }

  /**
   * Delete a script
   * @param {Request} req
   * @param {Response} res
   * @memberof ScriptRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.script.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all scripts
   * @param {Request} req
   * @param {Response} res
   * @memberof ScriptRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const scripts = await this.friday.script.getAll();
    res.json(scripts);
  }

  /**
   * Get script by id
   * @param {Request} req
   * @param {Response} res
   * @memberof ScriptRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const script = await this.friday.script.getById(req.params.id);
    res.json(script);
  }

}
