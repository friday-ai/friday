import DeviceClass from '../index';
import checkAvailableFeature from './checkAvailableFeature';
import { DeviceTypeParameter, FeatureParameter } from '../../../utils/interfaces';
import error from '../../../utils/errors/coreError';
import DeviceType from '../device.interface';
import getFeatures from './features.helper';

export default class Media {
  private device: DeviceClass;
  private readonly MEDIA_CONST = 'MEDIA';

  constructor(device: DeviceClass) {
    this.device = device;
  }

  public async command(action: string, params: DeviceTypeParameter) {
    try {
      const device = await this.device.getById(params.deviceId);

      const featureList = checkAvailableFeature(device, action);

      if (this.checkMediaType(device)) {
        const features = await getFeatures(device, featureList);

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

  private checkMediaType(device: DeviceType) {
    return device.type === this.MEDIA_CONST;
  }
}
