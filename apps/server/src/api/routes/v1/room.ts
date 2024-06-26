import type { Request, Response } from "express";
import type Friday from "../../../core/friday";
import { Delete, FridayRouter, Get, Patch, Post } from "../../../utils/decorators/route";

/**
 * Room router
 * @apiDefine RoomParam
 * @apiParam {String} name Name of the house.
 * @apiParam {UUIDV4} houseId Identifier of the house to which the room belongs.
 */
@FridayRouter("/v1/room")
export default class RoomRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create an room
   * @apiName create
   * @apiDescription This route allows you to create an room
   * @api {post} /api/v1/room
   * @apiGroup Room
   * @apiUse RoomParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   name: 'Bedroom',
   *   houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
   * }
   */
  @Post({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "create",
    aclResource: "room",
  })
  create = async (req: Request, res: Response) => {
    const room = await this.friday.room.create(req.body);
    res.status(201).json(room);
  };

  /**
   * Update an room
   * @apiName create
   * @apiDescription This route allows you to update an room
   * @api {patch} /api/v1/room
   * @apiGroup Room
   * @apiUse RoomParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   name: 'Bedroom',
   *   houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
   * }
   */
  @Patch({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "update",
    aclResource: "room",
  })
  update = async (req: Request, res: Response) => {
    const room = await this.friday.room.update(req.params.id, req.body);
    res.json(room);
  };

  /**
   * Delete an room by id
   * @apiName destroy
   * @apiDescription This route allows you to delete an room
   * @api {delete} /api/v1/room/:id
   * @apiGroup Room
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
    aclResource: "room",
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.room.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All rooms
   * @apiName listAll
   * @apiDescription This route allows you to List All rooms
   * @api {get} /api/v1/room
   * @apiGroup Room
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   name: 'Bedroom',
   *   houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
   * }]
   */
  @Get({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "room",
  })
  listAll = async (req: Request, res: Response) => {
    const rooms = await this.friday.room.listAll(req.query);
    res.json(rooms);
  };

  /**
   * Get an room by id
   * @apiName getById
   * @apiDescription This route allows you to get an room with his identifier
   * @api {get} /api/v1/room/:id
   * @apiGroup Room
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
   *   name: 'Bedroom',
   *   houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
   * }
   */
  @Get({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "room",
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const room = await this.friday.room.getById(req.params.id, scope);
    res.json(room);
  };
}
