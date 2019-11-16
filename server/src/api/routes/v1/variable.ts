import { Request, Response, NextFunction } from 'express';
import { FridayRouter, Get, Patch, Post, Delete } from '../../../utils/decorators/route';

/**
 * Variable router
 * @export
 * @param {*} friday
 */
@FridayRouter('/v1/variable')
export default class VariableRouter {
  readonly friday: any;

  constructor(friday: any) {
    this.friday = friday;
  }

  /**
   * Create a variable
   * @param {Request} req
   * @param {Response} res
   * @memberof VariableRouter
   */
  @Post({ path: '/', authenticated: true, rateLimit: false })
  create = async (req: Request, res: Response, next: NextFunction) => {
    const variable = await this.friday.variable.create(req.body);
    res.status(201).json(variable);
  }

  /**
   * Update a variable
   * @param {Request} req
   * @param {Response} res
   * @memberof VariableRouter
   */
  @Patch({ path: '/:id', authenticated: true, rateLimit: false })
  update = async (req: Request, res: Response, next: NextFunction) => {
    const variable = await this.friday.variable.update(req.body);
    res.json(variable);
  }

  /**
   * Delete a variable
   * @param {Request} req
   * @param {Response} res
   * @memberof VariableRouter
   */
  @Delete({ path: '/:id', authenticated: true, rateLimit: false })
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    await this.friday.variable.destroy(req.params.id);
    res.json({
      success: true
    });
  }

  /**
   * Get all variables
   * @param {Request} req
   * @param {Response} res
   * @memberof VariableRouter
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getAll = async (req: Request, res: Response) => {
    const variables = await this.friday.variable.getAll();
    res.json(variables);
  }

  /**
   * Get variable by id
   * @param {Request} req
   * @param {Response} res
   * @memberof VariableRouter
   */
  @Get({ path: '/:id', authenticated: true, rateLimit: false })
  getbyId = async (req: Request, res: Response, next: NextFunction) => {
    const variable = await this.friday.variable.getById(req.params.id);
    res.json(variable);
  }

}
