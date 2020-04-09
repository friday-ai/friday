import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';
import Friday from '../../../../src/core/friday';

/**
 * Plugin router
 * @apiDefine PluginParam
 * @apiParam {String} name Name of the plugin.
 * @apiParam {String} version Version of the plugin.
 * @apiParam {String} url Url of the plugin.
 * @apiParam {Boolean} [enabled] State of the plugin.
 * @apiParam {UUIDV4} satelliteId Identifier of the satellite to which the plugin belongs.
 */
@FridayRouter('/v1/plugin')
export default class PluginRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create a plugin
   * @apiName create
   * @apiDescription This route allows you to create a plugin
   * @api {post} /api/v1/plugin
   * @apiGroup Plugin
   * @apiUse PluginParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
   *   name: 'Zwave',
   *   version: '1.2.0',
   *   url: 'fake url',
   *   enabled: true,
   *   satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
   * },
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const plugin = await this.friday.plugin.create(req.body);
    res.status(201).json(plugin);
  }

  /**
   * Update a plugin
   * @apiName update
   * @apiDescription This route allows you to update a plugin
   * @api {post} /api/v1/plugin/:id
   * @apiGroup Plugin
   * @apiUse PluginParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
   *   name: 'Zwave',
   *   version: '1.2.0',
   *   url: 'fake url',
   *   enabled: true,
   *   satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
   * },
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const plugin = await this.friday.plugin.update(req.params.id, req.body);
    res.json(plugin);
  }

  /**
   * Delete a plugin
   * @apiName destroy
   * @apiDescription This route allows you to delete a plugin
   * @api {get} /api/v1/plugin/:id
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
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
   * @apiName getAll
   * @apiDescription This route allows you to get all plugins
   * @api {get} /api/v1/plugin
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
   *   name: 'Zwave',
   *   version: '1.2.0',
   *   url: 'fake url',
   *   enabled: true,
   *   satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
   * }],
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const plugins = await this.friday.plugin.getAll(req.query);
    res.json(plugins);
  }

  /**
   * Get a plugin by id
   * @apiName getById
   * @apiDescription This route allows you to get a plugin with his identifier
   * @api {get} /api/v1/plugin/:if
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
   *   name: 'Zwave',
   *   version: '1.2.0',
   *   url: 'fake url',
   *   enabled: true,
   *   satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
   * },
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const plugin = await this.friday.plugin.getById(req.params.id, req.query.scope);
    res.json(plugin);
  }

}
