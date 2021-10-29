import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';
import StateClass from '../state/index';
import checkAvailableFeature from './features/checkAvailableFeature';
import error from '../../utils/errors/coreError';
import { AvailableState } from '../../utils/constants';
import Light from './features/light';
import Media from './features/media';

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
  private light: Light;
  private media: Media;

  constructor(state: StateClass) {
    this.state = state;
    this.light = new Light(this);
    this.media = new Media(this);
  }

  public async sendCommand(action: string, id: string, value: [any]|null = null) {
    try {
      await this.checkDeviceAndFeature(id, action);
      // @Todo: API MQTT to call
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature: action, id, value },
      });
    }
  }

  public async lightDevice(feature: string, id: string, value: AvailableState|number) {
    try {
      await this.light.command(feature, {
        deviceId: id,
        state: value,
      });
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature, id, value },
      });
    }
  }

  public async mediaDevice(feature: string, id: string, value: AvailableState|number) {
    try {
      await this.media.command(feature, {
        deviceId: id,
        state: value,
      });
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature, id, value },
      });
    }
  }

  private async checkDeviceAndFeature(id: string, feature: string) {
    try {
      const device = await this.getById(id);
      checkAvailableFeature(device, feature);
      return device;
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature, id },
      });
    }
  }
}
