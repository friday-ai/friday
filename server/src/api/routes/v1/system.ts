import { Request, Response } from 'express';
import { FridayRouter, Get } from '../../../utils/decorators/route';
import Friday from '../../../core/friday';

/**
 * System router
 */
@FridayRouter('/v1/system')
export default class SystemRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Get version
   * @apiName getVersion
   * @apiDescription This route allows you to get friday version
   * @api {get} /api/v1/system
   * @apiSampleRequest http://localhost:3000
   * @apiGroup System
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "1.0.0",
   * }
   */
  @Get({ path: '/', authenticated: true, rateLimit: false })
  getVersion = async (req: Request, res: Response) => {
    const version = await this.friday.getVersion();
    res.json(version);
  };
}
