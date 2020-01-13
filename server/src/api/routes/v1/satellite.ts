import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Satellite router
 * @apiDefine SatelliteParam
 * @apiParam {String} name Name of the satellite.
 * @apiParam {UUIDV4} roomId Identifier of the room to which the satellite belongs.
 */
@FridayRouter('/v1/satellite')
export default class SatelliteRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a satellite
   * @apiName create
   * @apiDescription This route allows you to create a satellite
   * @api {post} /api/v1/satellite
   * @apiGroup Satellite
   * @apiUse SatelliteParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const satellite = await this.friday.satellite.create(req.body);
    res.status(201).json(satellite);
  }

  /**
   * Update a satellite
   * @apiName create
   * @apiDescription This route allows you to update a satellite
   * @api {patch} /api/v1/satellite
   * @apiGroup Satellite
   * @apiUse SatelliteParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const satellite = await this.friday.satellite.update(req.body);
    res.json(satellite);
  }

  /**
   * Delete a satellite by id
   * @apiName destroy
   * @apiDescription This route allows you to delete a satellite
   * @api {delete} /api/v1/satellite/:id
   * @apiGroup Satellite
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
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
   * @apiName getAll
   * @apiDescription This route allows you to get all satellites
   * @api {get} /api/v1/satellite
   * @apiGroup Satellite
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }]
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const satellites = await this.friday.satellite.getAll(req.query);
    res.json(satellites);
  }

  /**
   * Get a satellite by id
   * @apiName getById
   * @apiDescription This route allows you to get a satellite with his identifier
   * @api {get} /api/v1/satellite/:id
   * @apiGroup Satellite
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
   *   name: 'Main satellite',
   *   roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
   * }
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const satellite = await this.friday.satellite.getById(req.params.id);
    res.json(satellite);
  }

}