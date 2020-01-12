import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Room router
 * @apiDefine RoomParam
 * @apiParam {String} name Name of the house.
 * @apiParam {UUIDV4} houseId Identifier of the house to which the room belongs.
 */
@FridayRouter('/v1/room')
export default class RoomRouter {
  readonly friday: any;

  constructor(friday: any) {
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
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const room = await this.friday.room.create(req.body);
    res.status(201).json(room);
  }

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
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const room = await this.friday.room.update(req.body);
    res.json(room);
  }

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
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.room.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all rooms
   * @apiName getAll
   * @apiDescription This route allows you to get all rooms
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
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const rooms = await this.friday.room.getAll(req.query);
    res.json(rooms);
  }

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
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const room = await this.friday.room.getById(req.params.id);
    res.json(room);
  }

}
