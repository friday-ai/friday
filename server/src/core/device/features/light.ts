import DeviceClass from '../index';
import checkAvailableFeature from './checkAvailableFeature';
import DeviceType from '../device.interface';
import error from '../../../utils/errors/coreError';
import { DeviceTypeParameter, FeatureParameter } from '../../../utils/interfaces';
import { getLightFeatures } from './features.helper';

export default class Light {
  private device: DeviceClass;
  private readonly LIGHT_CONST = 'LIGHT';

  constructor(device: DeviceClass) {
    this.device = device;
  }

  public async command(action: string, params: DeviceTypeParameter) {
    try {
      const device = await this.device.getById(params.deviceId);

      checkAvailableFeature(device, action);

      if (this.checkLightType(device)) {
        const features = await getLightFeatures();

        const paramFeature: FeatureParameter = {
          device,
          deviceClass: this.device,
          state: params.state,
        };

        return features[action](paramFeature);
      }
      throw new Error('This device is not a light type');
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { action, params },
      });
    }
  }

  private checkLightType(device: DeviceType) {
    return device.type === this.LIGHT_CONST;
  }
}
