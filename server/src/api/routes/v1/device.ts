import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Device router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/device')
export default class DeviceRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a device
   * @param {Request} req
   * @param {Response} res
   * @memberof DeviceRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const device = await this.friday.device.create(req.body);
    res.status(201).json(device);
  }

  /**
   * Update a device
   * @param {Request} req
   * @param {Response} res
   * @memberof DeviceRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const device = await this.friday.device.update(req.body);
    res.json(device);
  }

  /**
   * Delete a device
   * @param {Request} req
   * @param {Response} res
   * @memberof DeviceRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.device.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all devices
   * @param {Request} req
   * @param {Response} res
   * @memberof DeviceRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const devices = await this.friday.device.getAll();
    res.json(devices);
  }

  /**
   * Get device by id
   * @param {Request} req
   * @param {Response} res
   * @memberof DeviceRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const device = await this.friday.device.getById(req.params.id);
    res.json(device);
  }

}
