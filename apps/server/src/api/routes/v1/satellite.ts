import { Request, Response } from 'express';
import { FridayMode } from '../../../config/constants';
import Friday from '../../../core/friday';
import { Delete, FridayRouter, Get, Patch, Post } from '../../../utils/decorators/route';

/**
 * Satellite router
 * @apiDefine SatelliteParam
 * @apiParam {String} name Name of the satellite.
 * @apiParam {UUIDV4} roomId Identifier of the room to which the satellite belongs.
 */
@FridayRouter('/v1/satellite')
export default class SatelliteRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create a satellite
   * @apiName create
   * @apiDescription This route allows you to create a satellite
   * @api {post} /api/v1/satellite
   * @apiGroup Satellite
   * @apiUse SatelliteParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Post({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'create',
    aclResource: 'satellite',
  })
  create = async (req: Request, res: Response) => {
    const satellite = await this.friday.satellite.create(req.body);
    res.status(201).json(satellite);
  };

  /**
   * Update a satellite
   * @apiName create
   * @apiDescription This route allows you to update a satellite
   * @api {patch} /api/v1/satellite
   * @apiGroup Satellite
   * @apiUse SatelliteParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Patch({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'satellite',
  })
  update = async (req: Request, res: Response) => {
    const satellite = await this.friday.satellite.update(req.params.id, req.body);
    res.json(satellite);
  };

  /**
   * Delete a satellite by id
   * @apiName destroy
   * @apiDescription This route allows you to delete a satellite
   * @api {delete} /api/v1/satellite/:id
   * @apiGroup Satellite
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
    aclResource: 'satellite',
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.satellite.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All satellites
   * @apiName listAll
   * @apiDescription This route allows you to List All satellites
   * @api {get} /api/v1/satellite
   * @apiGroup Satellite
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }]
   */
  @Get({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'satellite',
  })
  listAll = async (req: Request, res: Response) => {
    const satellites = await this.friday.satellite.listAll(req.query);
    res.json(satellites);
  };

  /**
   * discover a satellite
   * @apiName discovery
   * @apiDescription This route allows you to discover a satellite
   * @api {get} /api/v1/satellite/discovery
   * @apiGroup Satellite
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Get({
    path: '/discovery',
    authenticated: false,
    rateLimit: false,
    aclMethod: 'discovery',
    aclResource: 'satellite',
  })
  discovery = async (_: Request, res: Response) => {
    if (this.friday.mode === FridayMode.CONFIG_SATELLITE) {
      this.friday.mode = FridayMode.NOMINAL;
      res.status(200).json({
        mode: 'config',
      });
    }
  };

  @Get({
    path: '/login',
    authenticated: false,
    rateLimit: false,
    aclMethod: 'login',
    aclResource: 'satellite',
  })
  login = async (_req: Request, res: Response) => {
    // const url = `http://${req.query.ip}:8080/login`;
    // redirect to url
    // console.log(url);
    res.json();
  };

  /**
   * Get a satellite by id
   * @apiName getById
   * @apiDescription This route allows you to get a satellite with his identifier
   * @api {get} /api/v1/satellite/:id
   * @apiGroup Satellite
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Get({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'satellite',
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const satellite = await this.friday.satellite.getById(req.params.id, scope);
    res.json(satellite);
  };

  /**
   * Stop all plugins of satellite
   * @apiName stopAllPlugins
   * @apiDescription This route allows you to stop all plugins of satellite
   * @api {patch} /api/v1/satellite/stop/plugins/:id
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Patch({
    path: '/stop/plugins/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'satellite',
  })
  stopAllPlugins = async (req: Request, res: Response) => {
    await this.friday.satellite.stopAllPlugins(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * Restart all plugins of satellite
   * @apiName restartAll
   * @apiDescription This route allows you to restart all plugins
   * @api {patch} /api/v1/satellite/restart/plugins/:id
   * @apiGroup Plugin
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Patch({
    path: '/restart/plugins/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'satellite',
  })
  restartAllPlugins = async (req: Request, res: Response) => {
    await this.friday.satellite.restartAllPlugins(req.params.id);
    res.json({
      success: true,
    });
  };
}
