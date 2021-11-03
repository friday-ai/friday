import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';
import StateClass from '../state/index';
import getAvailableFeatures from './subdevice/subdevice.getFeatures';
import error from '../../utils/errors/coreError';
import { DeviceTypeParameter, FeatureParameter } from '../../utils/interfaces';
import getFeatures from './features/features.helper';
import checkAvailableFeature from './features/checkAvailableFeature';

/**
 * Device
 */
export default class Device {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;

  public state: StateClass;

  constructor(state: StateClass) {
    this.state = state;
  }

  public async sendCommand(action: string, params: DeviceTypeParameter) {
    try {
      const device = await this.getById(params.deviceId);

      checkAvailableFeature(device, action);

      const featureList = getAvailableFeatures(device.type!, device.subType!);

      const features = await getFeatures(device.type!, featureList);

      const paramFeature: FeatureParameter = {
        device,
        deviceClass: this,
        state: params.state,
      };

      return features[action](paramFeature);
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { action, params },
      });
    }
  }
}
