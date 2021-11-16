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
  @Get({
    path: '/', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'system',
  })
  getVersion = async (req: Request, res: Response) => {
    const version = await this.friday.getVersion();
    res.json(version);
  };

  /**
   * Get master id
   * @apiName infoMaster
   * @apiDescription This route allows you to get friday master information
   * @api {get} /api/v1/system/info
   * @apiSampleRequest http://localhost:3000
   * @apiGroup System
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   mqttInfo: {
            // @todo : describe
        },
        masterId: "6fe3c56e-df6f-4b50-8464-e8bb4e2c9ba2"
   * }
   */
  @Get({
    path: '/info', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'system',
  })
  infoMaster = async (req: Request, res: Response) => {
    res.json({
      mqttInfo: this.friday.mqttSecret,
      masterId: this.friday.masterId,
    });
  };
}
