import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * User router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/user')
export default class UserRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a user
   * @param {Request} req
   * @param {Response} res
   * @memberof UserRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.friday.user.create(req.body);
    res.status(201).json(user);
  }

  /**
   * Update a user
   * @param {Request} req
   * @param {Response} res
   * @memberof UserRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.friday.user.update(req.body);
    res.json(user);
  }

  /**
   * Delete a user
   * @param {Request} req
   * @param {Response} res
   * @memberof UserRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.user.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all users
   * @param {Request} req
   * @param {Response} res
   * @memberof UserRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const users = await this.friday.user.getAll();
    res.json(users);
  }

  /**
   * Get user by id
   * @param {Request} req
   * @param {Response} res
   * @memberof UserRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.friday.user.getById(req.params.id);
    res.json(user);
  }

}
