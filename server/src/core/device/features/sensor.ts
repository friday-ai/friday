import { setState, getState } from './common/common.state';
import { setBattery, getBattery } from './common/common.battery';
import DeviceClass from '../index';
import { DeviceTypeParameter, FeatureParameter } from '../../../utils/interfaces';
import checkAvailableFeature from './checkAvailableFeature';
import error from '../../../utils/errors/coreError';
import DeviceType from '../device.interface';

export default class Sensor {
  setState = setState;
  getState = getState;
  setBattery = setBattery;
  getBattery = getBattery;

  private device: DeviceClass;
  private readonly SENSOR_CONST = 'SENSOR';

  constructor(device: DeviceClass) {
    this.device = device;
  }

  public async command(action: string, params: DeviceTypeParameter) {
    try {
      const device = await this.device.getById(params.deviceId);

      checkAvailableFeature(device, action);

      if (this.checkSensorType(device)) {
        const paramFeature: FeatureParameter = {
          device,
          deviceClass: this.device,
          state: params.state,
        };
        // @ts-ignore
        return this[action](paramFeature);
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
