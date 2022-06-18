import BaseModel from '../../utils/database/model.base';
import { SatelliteType } from '../../config/entities';
import SatelliteModel from '../../models/satellite';
import { Catch } from '../../utils/decorators/error';

import heartbeat from './satellite.heartbeat';

/**
 * Satellite
 */
export default class Satellite extends BaseModel<SatelliteModel, SatelliteType> {
  constructor() {
    super(SatelliteModel);
  }

  @Catch()
  async heartbeat(id: string) {
    return heartbeat(id);
  }
}
