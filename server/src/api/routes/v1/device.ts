import { Request, Response } from 'express';
import {
  FridayRouter, Get, Patch, Post, Delete,
} from '../../../utils/decorators/route';
import Friday from '../../../core/friday';

/**
 * Device router
 * @apiDefine DeviceParam
 * @apiParam {String} name Name of the device.
 * @apiParam {String} type Type of the device.
 * @apiParam {String} subType Subtype of the device.
 * @apiParam {Any} [variable] Variable attached of device.
 * @apiParam {String} [unit] Unit of device.
 * @apiParam {String} [value] Value of device.
 * @apiParam {UUIDV4} roomId Identifier of the room to which the device belongs.
 * @apiParam {UUIDV4} pluginId Plugin of the scene to which the device belongs.
 */
@FridayRouter('/v1/device')
export default class DeviceRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create a device
   * @apiName create
   * @apiDescription This route allows you to create a device
   * @api {post} /api/v1/device
   * @apiGroup Device
   * @apiUse DeviceParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
   *   name: 'Light',
   *   type: 'LIGHT',
   *   subType: 'RGB',
   *   variable: '',
   *   unit: '',
   *   value: 'on',
   *   roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
   * }
   */
  @Post({
    path: '/', authenticated: true, rateLimit: false, aclMethod: 'create', aclResource: 'device',
  })
  create = async (req: Request, res: Response) => {
    const device = await this.friday.device.create(req.body);
    res.status(201).json(device);
  };

  /**
   * Update a device
   * @apiName update
   * @apiDescription This route allows you to update a device
   * @api {patch} /api/v1/device/:id
   * @apiGroup Device
   * @apiUse DeviceParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
   *   name: 'Light',
   *   type: 'LIGHT',
   *   subType: 'RGB',
   *   variable: '',
   *   unit: '',
   *   value: 'on',
   *   roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
   * }
   */
  @Patch({
    path: '/:id', authenticated: true, rateLimit: false, aclMethod: 'update', aclResource: 'device',
  })
  update = async (req: Request, res: Response) => {
    const device = await this.friday.device.update(req.params.id, req.body);
    res.json(device);
  };

  /**
   * Delete a device
   * @apiName destroy
   * @apiDescription This route allows you to delete a device
   * @api {delete} /api/v1/device/:id
   * @apiGroup Device
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({
    path: '/:id', authenticated: true, rateLimit: false, aclMethod: 'delete', aclResource: 'device',
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.device.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * Get all devices
   * @apiName getAll
   * @apiDescription This route allows you to get all devices
   * @api {get} /api/v1/device
   * @apiGroup Device
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
   *   name: 'Light',
   *   type: 'LIGHT',
   *   subType: 'RGB',
   *   variable: '',
   *   unit: '',
   *   value: 'on',
   *   roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
   * }]
   */
  @Get({
    path: '/', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'device',
  })
  getAll = async (req: Request, res: Response) => {
    const devices = await this.friday.device.getAll(req.query);
    res.json(devices);
  };

  /**
   * Get a device by id
   * @apiName getById
   * @apiDescription This route allows you to get a device with his identifier
   * @api {get} /api/v1/device/:id
   * @apiGroup Device
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
   *   name: 'Light',
   *   type: 'LIGHT',
   *   subType: 'RGB',
   *   variable: '',
   *   unit: '',
   *   value: 'on',
   *   roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
   * }
   */
  @Get({
    path: '/:id', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'device',
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const device = await this.friday.device.getById(req.params.id, scope);
    res.json(device);
  };
}
