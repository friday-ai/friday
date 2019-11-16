import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Scene router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/scene')
export default class SceneRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a scene
   * @param {Request} req
   * @param {Response} res
   * @memberof SceneRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const scene = await this.friday.scene.create(req.body);
    res.status(201).json(scene);
  }

  /**
   * Update a scene
   * @param {Request} req
   * @param {Response} res
   * @memberof SceneRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const scene = await this.friday.scene.update(req.body);
    res.json(scene);
  }

  /**
   * Delete a scene
   * @param {Request} req
   * @param {Response} res
   * @memberof SceneRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.scene.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all scenes
   * @param {Request} req
   * @param {Response} res
   * @memberof SceneRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const scenes = await this.friday.scene.getAll();
    res.json(scenes);
  }

  /**
   * Get scene by id
   * @param {Request} req
   * @param {Response} res
   * @memberof SceneRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const scene = await this.friday.scene.getById(req.params.id);
    res.json(scene);
  }

}
