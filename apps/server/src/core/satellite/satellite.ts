import { SatelliteAttributes, SatelliteCreationAttributes, AvailableState, StateOwner, SatelliteCreationKeys } from '@friday/shared';
import BaseModel from '../../utils/database/model.base';
import SatelliteModel from '../../models/satellite';
import { Catch } from '../../utils/decorators/error';
import StateClass from '../state/state';
import logger from '../../utils/log';

import heartbeat from './satellite.heartbeat';

/**
 * Satellite
 */
export default class Satellite extends BaseModel<SatelliteModel, SatelliteAttributes, SatelliteCreationAttributes> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(SatelliteModel, SatelliteCreationKeys);
    this.state = state;
  }

  @Catch()
  async create(data: SatelliteCreationAttributes) {
    const satellite = await super.create(data);

    // Set default state for satellite
    await this.state.set({
      owner: satellite.id,
      ownerType: StateOwner.SATELLITE,
      value: AvailableState.SATELLITE_WAITING_CONFIGURATION,
      last: true,
    });

    logger.success(`Satellite ${satellite.id} created`);
    return satellite;
  }

  @Catch()
  async heartbeat(id: string) {
    return heartbeat(id);
  }
}
