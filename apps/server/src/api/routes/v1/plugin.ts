import { Request, Response } from 'express';
import Friday from '../../../core/friday';
import { Delete, FridayRouter, Get, Patch, Post } from '../../../utils/decorators/route';

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
   *   name: 'Zwave',
   *   version: '1.2.0',
   *   repo: 'hello-world:latest',
   *   satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   variables: [
   *      {
   *        key: 'variable key',
   *        value: 'variable value'
   *      }
   *   ]
   * },
   */
  @Post({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'install',
    aclResource: 'plugin',
  })
  install = async (req: Request, res: Response) => {
    const plugin = await this.friday.plugin.install(req.body);
    res.status(201).json(plugin);
  };

  /**
   * Update a plugin
   * @apiName update
   * @apiDescription This route allows you to update a plugin
   * @api {patch} /api/v1/plugin/:id
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
  @Patch({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'plugin',
  })
  update = async (req: Request, res: Response) => {
    const plugin = await this.friday.plugin.update(req.params.id, req.body);
    res.json(plugin);
  };

  /**
   * Stop a plugin
   * @apiName stop
   * @apiDescription This route allows you to stop a plugin
   * @api {patch} /api/v1/plugin/stop/:id
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Patch({
    path: '/stop/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'plugin',
  })
  stop = async (req: Request, res: Response) => {
    await this.friday.plugin.stop(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * Restart a plugin
   * @apiName restart
   * @apiDescription This route allows you to restart a plugin
   * @api {patch} /api/v1/plugin/restart/:id
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Patch({
    path: '/restart/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'plugin',
  })
  restart = async (req: Request, res: Response) => {
    await this.friday.plugin.restart(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * Uninstall a plugin
   * @apiName uninstall
   * @apiDescription This route allows you to uninstall a plugin
   * @api {delete} /api/v1/plugin/:id
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'delete',
    aclResource: 'plugin',
  })
  uninstall = async (req: Request, res: Response) => {
    await this.friday.plugin.uninstall(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All plugins
   * @apiName listAll
   * @apiDescription This route allows you to List All plugins
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
  @Get({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'plugin',
  })
  listAll = async (req: Request, res: Response) => {
    const plugins = await this.friday.plugin.listAll(req.query);
    res.json(plugins);
  };

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
  @Get({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'plugin',
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const plugin = await this.friday.plugin.getById(req.params.id, scope);
    res.json(plugin);
  };
}
