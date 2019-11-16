import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Satellite router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/satellite')
export default class SatelliteRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a satellite
   * @param {Request} req
   * @param {Response} res
   * @memberof SatelliteRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const satellite = await this.friday.satellite.create(req.body);
    res.status(201).json(satellite);
  }

  /**
   * Update a satellite
   * @param {Request} req
   * @param {Response} res
   * @memberof SatelliteRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const satellite = await this.friday.satellite.update(req.body);
    res.json(satellite);
  }

  /**
   * Delete a satellite
   * @param {Request} req
   * @param {Response} res
   * @memberof SatelliteRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.satellite.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all satellites
   * @param {Request} req
   * @param {Response} res
   * @memberof SatelliteRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const satellites = await this.friday.satellite.getAll();
    res.json(satellites);
  }

  /**
   * Get satellite by id
   * @param {Request} req
   * @param {Response} res
   * @memberof SatelliteRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const satellite = await this.friday.satellite.getById(req.params.id);
    res.json(satellite);
  }

}
