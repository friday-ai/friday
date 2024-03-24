import logger from '@friday-ai/logger';
import type { SatelliteAttributes, SatelliteCreationAttributes } from '@friday-ai/shared';
import { AvailableState, SatelliteCreationKeys, StateOwner } from '@friday-ai/shared';
import SatelliteModel from '../../models/satellite';
import BaseModel from '../../utils/database/model.base';
import { Catch } from '../../utils/decorators/error';
import PluginClass from '../plugin/plugin';
import StateClass from '../state/state';

import heartbeat from './satellite.heartbeat';
import restartAllPlugins from './satellite.restartAllPlugins';
import stopAllPlugins from './satellite.stopAllPlugins';

/**
 * Satellite
 */
export default class Satellite extends BaseModel<SatelliteModel, SatelliteAttributes, SatelliteCreationAttributes> {
  public state: StateClass;
  public plugin: PluginClass;

  constructor(state: StateClass, plugin: PluginClass) {
    super(SatelliteModel, SatelliteCreationKeys);
    this.state = state;
    this.plugin = plugin;
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

  @Catch()
  async stopAllPlugins(id: string) {
    return stopAllPlugins.call(this, id);
  }

  @Catch()
  async restartAllPlugins(id: string) {
    return restartAllPlugins.call(this, id);
  }
}
