import { Request, Response } from 'express';
import { FridayRouter, Get, Post } from '../../../utils/decorators/route';
import Friday from '../../../core/friday';
import { encrypt } from '../../../utils/keyring';
import { AvailableState, FridayMode } from '../../../utils/constants';

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
    path : '/', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'system',
  })
    getVersion = async (req: Request, res: Response) => {
      const version = await this.friday.getVersion();
      res.json(version);
    };

  /**
   * Init Friday
   */
  @Post({
    path : '/init', authenticated: true, rateLimit: true, aclMethod: 'read', aclResource: 'system',
  })
    init = async (req: Request, res: Response) => {
    // This route is only active at first start for security reasons
      if (this.friday.mode === FridayMode.INIT) {
        const result = await this.friday.init();
        res.status(200).json({
          success: result,
        });
      } else {
        res.sendStatus(404);
      }
    };


  /**
   * get master id
   * @apiName configMqtt
   * @apiDescription This route allows you to get friday master information
   * @api {get} /api/v1/system/info
   * @apiSampleRequest http://localhost:3000
   * @apiGroup System
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "masterId": "8ab51154-a436-4aa0-957d-ac34acc0ad1f",
   * }
   */
  @Get({
    path : '/info', authenticated: false, rateLimit: false, aclMethod: 'read', aclResource: 'system',
  })
    masterInfo = async (req: Request, res: Response) => res.json({
      masterId: this.friday.masterId,
    });

  /**
   * get mqtt config, master id and satellite id
   * @apiName configMqtt
   * @apiDescription This route allows you to get mqtt configuration for satellite
   * @api {get} /api/v1/system/info
   * @apiSampleRequest http://localhost:3000
   * @apiGroup System
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "mqttInfo": "+OLvbqHxcPS2xAZGofMog4RQV1m2+zkp3tNIrm3g1jQUxMxVo7n/siFtOSV1WOkAFc1yFRrFgYexj4ZS07IRL",
   *   "satelliteId": "tDTnpdKPSZAt/nv6cLvh8jtLmpM7sxrNpw6/CVPdOu9vQtKrx0sl/8qUEOPCOkAFc1yF"
   * }
   */
  @Get({
    path : '/mqtt/config', authenticated: true, rateLimit: false, aclMethod: 'read', aclResource: 'system',
  })
    configMqtt = async (req: Request, res: Response) => {
      const satellites = await this.friday.satellite.getAll({ scope: 'withState' });
      const satellite = satellites.filter((s) => s.state!.value === AvailableState.SATELLITE_WAITING_CONFIGURATION);
      if (satellite.length === 0) {
        return res.status(404).json('Satellite is not configured !');
      }

      const satelliteId = satellite[0].id;
      return res.json({
        mqttInfo: encrypt(JSON.stringify(this.friday.mqttSecret), satelliteId!)[0],
        satelliteId: encrypt(satelliteId!, this.friday.masterId)[0],
      });
    };
}
