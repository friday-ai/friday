import { AvailableState, type SatelliteAttributes } from "@friday-ai/shared";
import type { Request, Response } from "express";
import { FridayMode } from "../../../config/constants";
import type Friday from "../../../core/friday";
import { FridayRouter, Get, Post } from "../../../utils/decorators/route";
import { encrypt } from "../../../utils/keyring";

/**
 * System router
 */
@FridayRouter("/v1/system")
export default class SystemRouter {
  private readonly friday: Friday;

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
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "system",
  })
  getVersion = async (_: Request, res: Response) => {
    const version = await this.friday.getVersion();
    res.json(version);
  };

  /**
   * Get settings
   * @apiName getSettings
   * @apiDescription This route allows you to get friday's settings
   * @api {get} /api/v1/system/settings
   * @apiSampleRequest http://localhost:3000
   * @apiGroup System
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   version: "1.0.0",
   *   untis: "metric"
   *   history: "30"
   * }
   */
  @Get({
    path: "/settings",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "system",
  })
  getSettings = async (_: Request, res: Response) => {
    const settings = await this.friday.getSettings();
    res.json(settings);
  };

  /**
   * Init Friday
   */
  @Post({
    path: "/init",
    authenticated: true,
    rateLimit: true,
    aclMethod: "read",
    aclResource: "system",
  })
  init = async (_: Request, res: Response) => {
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
    path: "/info",
    authenticated: false,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "system",
  })
  masterInfo = async (_: Request, res: Response) =>
    res.json({
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
    path: "/mqtt/config",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "system",
  })
  configMqtt = async (_: Request, res: Response) => {
    const satellites = await this.friday.satellite.listAll({ scope: "withState" });

    const satellite = satellites.filter((s: SatelliteAttributes) => s.state.value === AvailableState.SATELLITE_WAITING_CONFIGURATION);

    if (satellite.length === 0) {
      return res.status(404).json("Satellite is not configured !");
    }

    const satelliteId = satellite[0].id;
    return res.json({
      mqttInfo: encrypt(JSON.stringify(this.friday.mqttSecret), satelliteId)[0],
      satelliteId: encrypt(satelliteId, this.friday.masterId)[0],
    });
  };
}
