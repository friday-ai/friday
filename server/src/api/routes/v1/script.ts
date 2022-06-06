import { Request, Response } from 'express';
import {
  FridayRouter, Get, Patch, Post, Delete,
} from '../../../utils/decorators/route';
import Friday from '../../../core/friday';

/**
 * Script router
 * @apiDefine ScriptParam
 * @apiParam {String} name Name of the script.
 * @apiParam {JSON} code Code of the script.
 */
@FridayRouter('/v1/script')
export default class ScriptRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create a script
   * @apiName create
   * @apiDescription This route allows you to create a script
   * @api {post} /api/v1/script
   * @apiGroup Script
   * @apiUse ScriptParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'd354cede-3895-4dac-8a90-73d970b4617c',
   *   name: 'Test Script',
   *   code: 'console.log(\'Hey ! This script is a test ! :)\')'
   * }
   */
  @Post({
    path : '/', authenticated: true, rateLimit: false, aclMethod: 'create', aclResource: 'script',
  })
    create = async (req: Request, res: Response) => {
      const script = await this.friday.script.create(req.body);
      res.status(201).json(script);
    };

  /**
   * Update a script
   * @apiName create
   * @apiDescription This route allows you to update a script
   * @api {patch} /api/v1/script
   * @apiGroup Script
   * @apiUse ScriptParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'd354cede-3895-4dac-8a90-73d970b4617c',
   *   name: 'Test Script',
   *   code: 'console.log(\'Hey ! This script is a test ! :)\')'
   * }
   */
  @Patch({
    path : '/:id', authenticated: true, rateLimit: false, aclMethod: 'update', aclResource: 'script',
  })
    update = async (req: Request, res: Response) => {
      const script = await this.friday.script.update(req.params.id, req.body);
      res.json(script);
    };

  /**
   * Delete a script by id
   * @apiName destroy
   * @apiDescription This route allows you to delete a script
   * @api {delete} /api/v1/script/:id
   * @apiGroup Script
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({
    path : '/:id', authenticated: true, rateLimit: false, aclMethod: 'delete', aclResource: 'script',
  })
    destroy = async (req: Request, res: Response) => {
      await this.friday.script.destroy(req.params.id);
      res.json({
        success: true,
      });
    };

  /**
   * Get all scripts
   * @apiName getAll
   * @apiDescription This route allows you to get all scripts
   * @api {get} /api/v1/script
   * @apiGroup Script
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: 'd354cede-3895-4dac-8a90-73d970b4617c',
   *   name: 'Test Script',
   *   code: 'console.log(\'Hey ! This script is a test ! :)\')'
   * }]
   */
  @Get({
    path : '/', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'script',
  })
    getAll = async (req: Request, res: Response) => {
      const scripts = await this.friday.script.getAll(req.query);
      res.json(scripts);
    };

  /**
   * Get a script by id
   * @apiName getById
   * @apiDescription This route allows you to get a script with his identifier
   * @api {get} /api/v1/script/:id
   * @apiGroup Script
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'd354cede-3895-4dac-8a90-73d970b4617c',
   *   name: 'Test Script',
   *   code: 'console.log(\'Hey ! This script is a test ! :)\')'
   * }
   */
  @Get({
    path : '/:id', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'script',
  })
    getById = async (req: Request, res: Response) => {
      const script = await this.friday.script.getById(req.params.id);
      res.json(script);
    };
}
