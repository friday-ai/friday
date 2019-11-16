import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Room router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/room')
export default class RoomRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a room
   * @param {Request} req
   * @param {Response} res
   * @memberof RoomRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const room = await this.friday.room.create(req.body);
    res.status(201).json(room);
  }

  /**
   * Update a room
   * @param {Request} req
   * @param {Response} res
   * @memberof RoomRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const room = await this.friday.room.update(req.body);
    res.json(room);
  }

  /**
   * Delete a room
   * @param {Request} req
   * @param {Response} res
   * @memberof RoomRouter
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
   * @param {Request} req
   * @param {Response} res
   * @memberof RoomRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const rooms = await this.friday.room.getAll();
    res.json(rooms);
  }

  /**
   * Get room by id
   * @param {Request} req
   * @param {Response} res
   * @memberof RoomRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const room = await this.friday.room.getById(req.params.id);
    res.json(room);
  }

}
