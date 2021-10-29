import powerOn from './common/common.power-on';
import powerOff from './common/common.power-off';
import { setBrightness, getBrightness } from './light/light.brightness';
import { setHue, getHue } from './light/light.hue';
import { setWarmColdWhite, getWarmColdWhite } from './light/light.warm-cold-white';
import white from './light/light.white';
import warmWhite from './light/light.warm-white';
import DeviceClass from '../index';
import checkAvailableFeature from './checkAvailableFeature';
import DeviceType from '../device.interface';
import error from '../../../utils/errors/coreError';
import { DeviceTypeParameter, FeatureParameter } from '../../../utils/interfaces';

export default class Light {
  powerOn = powerOn;
  powerOff = powerOff;
  getBrightness = getBrightness;
  getHue = getHue;
  getWarmColdWhite = getWarmColdWhite;
  warmWhite = warmWhite;
  white = white;
  setBrightness = setBrightness;
  setHue = setHue;
  setWarmColdWhite = setWarmColdWhite;

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
        const paramFeature: FeatureParameter = {
          device,
          deviceClass: this.device,
          state: params.state,
        };
        // @ts-ignore
        return this[action](paramFeature);
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
