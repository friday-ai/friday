import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * House router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/house')
export default class HouseRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create an house
   * @param {Request} req
   * @param {Response} res
   * @memberof HouseRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const house = await this.friday.house.create(req.body);
    res.status(201).json(house);
  }

  /**
   * Update an house
   * @param {Request} req
   * @param {Response} res
   * @memberof HouseRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const house = await this.friday.house.update(req.body);
    res.json(house);
  }

  /**
   * Delete an house
   * @param {Request} req
   * @param {Response} res
   * @memberof HouseRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.house.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all houses
   * @param {Request} req
   * @param {Response} res
   * @memberof HouseRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const houses = await this.friday.house.getAll();
    res.json(houses);
  }

  /**
   * Get house by id
   * @param {Request} req
   * @param {Response} res
   * @memberof HouseRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const house = await this.friday.house.getById(req.params.id);
    res.json(house);
  }

}
