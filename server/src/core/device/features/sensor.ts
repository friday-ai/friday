import DeviceClass from '../index';
import { DeviceTypeParameter, FeatureParameter } from '../../../utils/interfaces';
import checkAvailableFeature from './checkAvailableFeature';
import error from '../../../utils/errors/coreError';
import DeviceType from '../device.interface';
import getFeatures from './features.helper';

export default class Sensor {
  private device: DeviceClass;
  private readonly SENSOR_CONST = 'SENSOR';

  constructor(device: DeviceClass) {
    this.device = device;
  }

  public async command(action: string, params: DeviceTypeParameter) {
    try {
      const device = await this.device.getById(params.deviceId);

      const featureList = checkAvailableFeature(device, action);

      if (this.checkSensorType(device)) {
        const features = await getFeatures(device, featureList);

        const paramFeature: FeatureParameter = {
          device,
          deviceClass: this.device,
          state: params.state,
        };

        return features[action](paramFeature);
      }
      throw new Error('This device is not a sensor type');
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { action, params },
      });
    }
  }

  private checkSensorType(device: DeviceType) {
    return device.type === this.SENSOR_CONST;
  }
}
