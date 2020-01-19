import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Variable router
 * @apiDefine VariableParam
 * @apiParam {String} key Key of the variable.
 * @apiParam {String} value Value of the variable.
 * @apiParam {String} owner Owner'id of the variable.
 * @apiParam {VariableOwner} ownerType Owner type of the variable.
 */
@FridayRouter('/v1/variable')
export default class VariableRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a variable
   * @apiName create
   * @apiDescription This route allows you to create a variable
   * @api {post} /api/v1/variable
   * @apiGroup Variable
   * @apiUse VariableParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
   *   key: 'test_key0',
   *   value: 'test_value0',
   *   owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   ownerType: 'user'
   * }
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const variable = await this.friday.variable.create(req.body);
    res.status(201).json(variable);
  }

  /**
   * Update a variable
   * @apiName create
   * @apiDescription This route allows you to update a variable
   * @api {patch} /api/v1/variable
   * @apiGroup Variable
   * @apiUse VariableParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
   *   key: 'test_key0',
   *   value: 'test_value0',
   *   owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   ownerType: 'user'
   * }
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const variable = await this.friday.variable.update(req.params.id, req.body);
    res.json(variable);
  }

  /**
   * Delete a variable by id
   * @apiName destroy
   * @apiDescription This route allows you to delete a variable
   * @api {delete} /api/v1/variable/:id
   * @apiGroup Variable
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.variable.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get value variables
   * @apiName getValue
   * @apiDescription This route allows you to get all variables
   * @api {get} /api/v1/variable
   * @apiGroup Variable
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
   *   key: 'test_key0',
   *   value: 'test_value0',
   *   owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   ownerType: 'user'
   * }
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getValue = async (req: Request, res: Response) => {
    const variables = await this.friday.variable.getValue(req.query.key);
    res.json(variables);
  }

}
