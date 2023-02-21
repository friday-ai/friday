import { Request, Response } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';
import Friday from '../../../core/friday';

/**
 * Trigger router
 * @apiDefine TriggerParam
 * @apiParam {String} name Name of the trigger.
 * @apiParam {String} [description] Description of the trigger.
 * @apiParam {AvailableConditions} type Type of the trigger.
 * @apiParam {JSON} rules Rules of the trigger.
 */
@FridayRouter('/v1/trigger')
export default class TriggerRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create a trigger
   * @apiName create
   * @apiDescription This route allows you to create a trigger
   * @api {post} /api/v1/trigger
   * @apiGroup Trigger
   * @apiUse TriggerParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
   *   name: 'Test',
   *   description: 'A trigger test',
   *   type: 'device.value',
   *   rules: {
   *     device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
   *     value: '23'
   *   }
   * }
   */
  @Post({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'create',
    aclResource: 'trigger',
  })
  create = async (req: Request, res: Response) => {
    const trigger = await this.friday.trigger.create(req.body);
    res.status(201).json(trigger);
  };

  /**
   * Update a trigger
   * @apiName create
   * @apiDescription This route allows you to update a trigger
   * @api {patch} /api/v1/trigger
   * @apiGroup Trigger
   * @apiUse TriggerParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
   *   name: 'Test',
   *   description: 'A trigger test',
   *   type: 'device.value',
   *   rules: {
   *     device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
   *     value: '23'
   *   }
   * }
   */
  @Patch({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'trigger',
  })
  update = async (req: Request, res: Response) => {
    const trigger = await this.friday.trigger.update(req.params.id, req.body);
    res.json(trigger);
  };

  /**
   * Delete a trigger by id
   * @apiName destroy
   * @apiDescription This route allows you to delete a trigger
   * @api {delete} /api/v1/trigger/:id
   * @apiGroup Trigger
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
    aclResource: 'trigger',
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.trigger.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All triggers
   * @apiName listAll
   * @apiDescription This route allows you to List All triggers
   * @api {get} /api/v1/trigger
   * @apiGroup Trigger
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
   *   name: 'Test',
   *   description: 'A trigger test',
   *   type: 'device.value',
   *   rules: {
   *     device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
   *     value: '23'
   *   }
   * }]
   */
  @Get({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'trigger',
  })
  listAll = async (req: Request, res: Response) => {
    const triggers = await this.friday.trigger.listAll(req.query);
    res.json(triggers);
  };

  /**
   * Get a trigger by id
   * @apiName getById
   * @apiDescription This route allows you to get a trigger with his identifier
   * @api {get} /api/v1/trigger/:id
   * @apiGroup Trigger
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
   *   name: 'Test',
   *   description: 'A trigger test',
   *   type: 'device.value',
   *   rules: {
   *     device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
   *     value: '23'
   *   }
   * }
   */
  @Get({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'trigger',
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const trigger = await this.friday.trigger.getById(req.params.id, scope);
    res.json(trigger);
  };
}
