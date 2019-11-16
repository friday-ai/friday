import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Plugin router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/plugin')
export default class PluginRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a plugin
   * @param {Request} req
   * @param {Response} res
   * @memberof PluginRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const plugin = await this.friday.plugin.create(req.body);
    res.status(201).json(plugin);
  }

  /**
   * Update a plugin
   * @param {Request} req
   * @param {Response} res
   * @memberof PluginRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const plugin = await this.friday.plugin.update(req.body);
    res.json(plugin);
  }

  /**
   * Delete a plugin
   * @param {Request} req
   * @param {Response} res
   * @memberof PluginRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.plugin.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all plugins
   * @param {Request} req
   * @param {Response} res
   * @memberof PluginRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const plugins = await this.friday.plugin.getAll();
    res.json(plugins);
  }

  /**
   * Get plugin by id
   * @param {Request} req
   * @param {Response} res
   * @memberof PluginRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const plugin = await this.friday.plugin.getById(req.params.id);
    res.json(plugin);
  }

}
