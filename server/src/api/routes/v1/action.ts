import { Request, Response } from 'express';
import {
  FridayRouter, Get, Patch, Post, Delete,
} from '../../../utils/decorators/route';

import Friday from '../../../core/friday';

/**
 * Action router
 * @apiDefine ActionParam
 * @apiParam {String} name Name of the action.
 * @apiParam {String} [description] Description of the action.
 * @apiParam {ActionsType} type Type of the action.
 * @apiParam {String} subType SubType of the action.
 * @apiParam {String} variableKey Name of the object affected by the action.
 * @apiParam {String} variable Value Value to give to the object affected by the action.
 * @apiParam {UUIDV4} sceneId Identifier of the scene to which the action belongs.
 */
@FridayRouter('/v1/action')
export default class ActionRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create an action
   * @apiName create
   * @apiDescription This route allows you to create an action
   * @api {post} /api/v1/action
   * @apiSampleRequest http://localhost:3000
   * @apiGroup Action
   * @apiUse ActionParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "id": "daff2ca0-5ab8-4e72-8561-c4ed9c7c6901",
   *   "name": "action example",
   *   "description": "action example description",
   *   "type": "light.turn_on",
   *   "subType": "",
   *   "variableKey": "action example variable key",
   *   "variableValue": "action example variable value",
   *   "sceneId": "2452964a-a225-47dd-9b83-d88d57ed280e"
   * }
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response) => {
    const action = await this.friday.action.create(req.body);
    res.status(201).json(action);
  };

  /**
   * Update an action
   * @apiName update
   * @apiDescription This route allows you to update an action
   * @api {patch} /api/v1/action/:id
   * @apiSampleRequest http://localhost:3000
   * @apiGroup Action
   * @apiUse ActionParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "id": "daff2ca0-5ab8-4e72-8561-c4ed9c7c6901",
   *   "name": "action example",
   *   "description": "action example description",
   *   "type": "light.turn_on",
   *   "subType": "",
   *   "variableKey": "action example variable key",
   *   "variableValue": "action example variable value",
   *   "sceneId": "2452964a-a225-47dd-9b83-d88d57ed280e"
   * }
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response) => {
    const action = await this.friday.action.update(req.params.id, req.body);
    res.json(action);
  };

  /**
   * Delete an action by id
   * @apiName destroy
   * @apiDescription This route allows you to delete an action
   * @api {delete} /api/v1/action/:id
   * @apiSampleRequest http://localhost:3000
   * @apiGroup Action
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response) => {
    await this.friday.action.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * Get all actions
   * @apiName getAll
   * @apiDescription This route allows you to get all actions
   * @api {get} /api/v1/action
   * @apiSampleRequest http://localhost:3000
   * @apiGroup Action
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   "id": "daff2ca0-5ab8-4e72-8561-c4ed9c7c6901",
   *   "name": "action example",
   *   "description": "action example description",
   *   "type": "light.turn_on",
   *   "subType": "",
   *   "variableKey": "action example variable key",
   *   "variableValue": "action example variable value",
   *   "sceneId": "2452964a-a225-47dd-9b83-d88d57ed280e"
   * }]
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const actions = await this.friday.action.getAll(req.query);
    res.json(actions);
  };

  /**
   * Get an action by id
   * @apiName getById
   * @apiDescription This route allows you to get an action with his identifier
   * @api {get} /api/v1/action/:id
   * @apiGroup Action
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "id": "daff2ca0-5ab8-4e72-8561-c4ed9c7c6901",
   *   "name": "action example",
   *   "description": "action example description",
   *   "type": "light.turn_on",
   *   "subType": "",
   *   "variableKey": "action example variable key",
   *   "variableValue": "action example variable value",
   *   "sceneId": "2452964a-a225-47dd-9b83-d88d57ed280e"
   * }
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const action = await this.friday.action.getById(req.params.id, scope);
    res.json(action);
  };
}
