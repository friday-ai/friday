import { Request, Response } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';
import Friday from '../../../core/friday';

/**
 * House router
 * @apiDefine HouseParam
 * @apiParam {String} name Name of the house.
 * @apiParam {String} latitude Latitude of the house.
 * @apiParam {String} longitude Longitude of the house.
 */
@FridayRouter('/v1/house')
export default class HouseRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create an house
   * @apiName create
   * @apiDescription This route allows you to create an house
   * @api {post} /api/v1/house
   * @apiGroup House
   * @apiUse HouseParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
   *   name: 'Main House',
   *   latitude: '34.0012295',
   *   longitude: '-118.8067245'
   * }
   */
  @Post({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'create',
    aclResource: 'house',
  })
  create = async (req: Request, res: Response) => {
    const house = await this.friday.house.create(req.body);
    res.status(201).json(house);
  };

  /**
   * Update an house
   * @apiName update
   * @apiDescription This route allows you to update an house
   * @api {patch} /api/v1/house/:id
   * @apiGroup House
   * @apiUse HouseParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
   *   name: 'Main House',
   *   latitude: '34.0012295',
   *   longitude: '-118.8067245'
   * }
   */
  @Patch({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'update',
    aclResource: 'house',
  })
  update = async (req: Request, res: Response) => {
    const house = await this.friday.house.update(req.params.id, req.body);
    res.json(house);
  };

  /**
   * Delete an house
   * @apiName destroy
   * @apiDescription This route allows you to delete an house
   * @api {delete} /api/v1/house/:id
   * @apiGroup House
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'delete',
    aclResource: 'house',
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.house.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All houses
   * @apiName listAll
   * @apiDescription This route allows you to List All houses
   * @api {get} /api/v1/house
   * @apiGroup House
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
   *   name: 'Main House',
   *   latitude: '34.0012295',
   *   longitude: '-118.8067245'
   * }]
   */
  @Get({
    path: '/',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'house',
  })
  listAll = async (req: Request, res: Response) => {
    const houses = await this.friday.house.listAll(req.query);
    res.json(houses);
  };

  /**
   * Get an house by id
   * @apiName getById
   * @apiDescription This route allows you to get an house with his identifier
   * @api {get} /api/v1/house/:id
   * @apiGroup House
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
   *   name: 'Main House',
   *   latitude: '34.0012295',
   *   longitude: '-118.8067245'
   * }
   */
  @Get({
    path: '/:id',
    authenticated: true,
    rateLimit: false,
    aclMethod: 'read',
    aclResource: 'house',
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const house = await this.friday.house.getById(req.params.id, scope);
    res.json(house);
  };
}
