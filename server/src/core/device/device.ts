import BaseModel from '../../utils/database/model.base';
import DeviceModel from '../../models/device';
import EventClass from '../../utils/event';
import { DeviceCapabilityStateType, DeviceCapabilityType, DeviceType2 } from '../../config/entities';
import { Catch } from '../../utils/decorators/error';
import { DeviceCapabilityRegisterType, DeviceRegisterType, DevicesActionsType } from '../../config/device';
import { DeviceCommandType } from '../../utils/interfaces';

import register from './device.register';
import exec from './device.exec';
import setCapability from './device.setCapability';
import getCapabilityById from './device.getCapabilityById';
import setCapabilityState from './device.setCapabilityState';
import { glob as Glob } from 'glob';

/**
 * Device
 */
export default class Device extends BaseModel<DeviceModel, DeviceType2> {
  public event: typeof EventClass;

  constructor(event: typeof EventClass) {
    super(DeviceModel);
    this.event = event;

    Glob.sync('**/*.{js,ts}', { cwd: `${__dirname}/capabilities/` }).forEach(
      (filename) => {
        const manager = require(`./capabilities/${filename}`);

        Object.keys(manager.options).forEach((key) => {
          manager.options[key].actions.forEach((action: DevicesActionsType) => {
            this.event.on(action, (e) => manager[key].bind(this)(e));
          });
        });
      },
    );
  }

  @Catch()
  async register(data: Omit<DeviceRegisterType, 'id'>) {
    return register.call(this, data);
  }

  @Catch()
  async setCapability(deviceId: string, capability: Omit<DeviceCapabilityRegisterType, 'id'>) {
    return setCapability.call(this, deviceId, capability);
  }

  @Catch()
  async getCapabilityById(id: string, scope?: string) {
    return getCapabilityById.call(this, id, scope!);
  }

  @Catch()
  async setCapabilityState(state: Omit<DeviceCapabilityStateType, 'id'>) {
    return setCapabilityState.call(this, state);
  }

  @Catch()
  async exec(capability: DeviceCapabilityType, command: DeviceCommandType) {
    return exec.call(this, capability, command);
  }
}
