import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';
import StateClass from '../state/index';
import checkAvailableFeature from './features/checkAvailableFeature';
import error from '../../utils/errors/coreError';
import { AvailableState } from '../../utils/constants';

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

  public async sendCommand(action: string, id: string, value: [any]|null = null) {
    try {
      const device = await this.getById(id);
      checkAvailableFeature(device, action);
      // @Todo: API MQTT to call
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature: action, id, value },
      });
    }
  }

  public async light(feature: string, id: string, value: AvailableState|number) {
    try {
      console.log('titi');
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature, id, value },
      });
    }
  }

  public async media(feature: string, id: string, value: AvailableState|number) {
    try {
      console.log('toto');
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { feature, id, value },
      });
    }
  }
}
