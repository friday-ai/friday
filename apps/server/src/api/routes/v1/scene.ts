import type { Request, Response } from "express";
import type Friday from "../../../core/friday";
import { Delete, FridayRouter, Get, Patch, Post } from "../../../utils/decorators/route";

/**
 * Scene router
 * @apiDefine SceneParam
 * @apiParam {String} name Name of the scene.
 * @apiParam {String} [description] Description of the scene.
 * @apiParam {UUIDV4} [triggerId] Identifier of the trigger to which the scene belongs.
 */
@FridayRouter("/v1/scene")
export default class SceneRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create an scene
   * @apiName create
   * @apiDescription This route allows you to create an scene
   * @api {post} /api/v1/scene
   * @apiGroup Scene
   * @apiUse SceneParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *    id: '2452964a-a225-47dd-9b83-d88d57ed280e',
   *    name: 'Test scene',
   *    description: 'A scene for the tests ;) ',
   *    triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
   * }
   */
  @Post({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "create",
    aclResource: "scene",
  })
  create = async (req: Request, res: Response) => {
    const scene = await this.friday.scene.create(req.body);
    res.status(201).json(scene);
  };

  /**
   * Update an scene
   * @apiName create
   * @apiDescription This route allows you to update an scene
   * @api {patch} /api/v1/scene
   * @apiGroup Scene
   * @apiUse SceneParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *    id: '2452964a-a225-47dd-9b83-d88d57ed280e',
   *    name: 'Test scene',
   *    description: 'A scene for the tests ;) ',
   *    triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
   * }
   */
  @Patch({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "update",
    aclResource: "scene",
  })
  update = async (req: Request, res: Response) => {
    const scene = await this.friday.scene.update(req.params.id, req.body);
    res.json(scene);
  };

  /**
   * Delete an scene by id
   * @apiName destroy
   * @apiDescription This route allows you to delete an scene
   * @api {delete} /api/v1/scene/:id
   * @apiGroup Scene
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "delete",
    aclResource: "scene",
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.scene.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All scenes
   * @apiName listAll
   * @apiDescription This route allows you to List All scenes
   * @api {get} /api/v1/scene
   * @apiGroup Scene
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *    id: '2452964a-a225-47dd-9b83-d88d57ed280e',
   *    name: 'Test scene',
   *    description: 'A scene for the tests ;) ',
   *    triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
   * }]
   */
  @Get({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "scene",
  })
  listAll = async (req: Request, res: Response) => {
    const scenes = await this.friday.scene.listAll(req.query);
    res.json(scenes);
  };

  /**
   * Get an scene by id
   * @apiName getById
   * @apiDescription This route allows you to get an scene with his identifier
   * @api {get} /api/v1/scene/:id
   * @apiGroup Scene
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *    id: '2452964a-a225-47dd-9b83-d88d57ed280e',
   *    name: 'Test scene',
   *    description: 'A scene for the tests ;) ',
   *    triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
   * }
   */
  @Get({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "scene",
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const scene = await this.friday.scene.getById(req.params.id, scope);
    res.json(scene);
  };
}
