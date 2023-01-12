/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import {
  DeviceAttributes,
  DeviceCommand,
  DevicesActions,
  DeviceCreationAttributes,
  DcCreationAttributes,
  DcstCreationAttributes,
  DeviceCapabilitySettingsSchema,
} from '@friday/shared';

import { glob as Glob } from 'glob';

import BaseModel from '../../utils/database/model.base';
import DeviceModel from '../../models/device';
import EventClass from '../../utils/event';
import { Catch } from '../../utils/decorators/error';

import register from './device.register';
import exec from './device.exec';
import setCapability from './device.setCapability';
import getCapabilityById from './device.getCapabilityById';
import setCapabilitySettings from './device.setCapabilitySettings';
import setCapabilityState from './device.setCapabilityState';

/**
 * Device
 */
export default class Device extends BaseModel<DeviceModel, DeviceAttributes, DeviceCreationAttributes> {
  public event: typeof EventClass;

  constructor(event: typeof EventClass) {
    super(DeviceModel);
    this.event = event;

    Glob.sync('**/*.{js,ts}', { cwd: `${__dirname}/capabilities/` }).forEach((filename) => {
      const manager = require(`./capabilities/${filename}`);

      Object.keys(manager.options).forEach((key) => {
        manager.options[key].actions.forEach((action: DevicesActions) => {
          this.event.on(action, (e) => manager[key].bind(this)(e));
        });
      });
    });
  }

  @Catch()
  async register(data: DeviceCreationAttributes) {
    return register.call(this, data);
  }

  @Catch()
  async setCapability(deviceId: string, capability: DcCreationAttributes) {
    return setCapability.call(this, deviceId, capability);
  }

  @Catch()
  async getCapabilityById(id: string, scope = '') {
    return getCapabilityById.call(this, id, scope);
  }

  @Catch()
  async setCapabilitySettings(capabilityId: string, settings: DeviceCapabilitySettingsSchema) {
    return setCapabilitySettings.call(this, capabilityId, settings);
  }

  @Catch()
  async setCapabilityState(state: DcstCreationAttributes) {
    return setCapabilityState.call(this, state);
  }

  @Catch()
  async exec(identifier: string, command: DeviceCommand) {
    return exec.call(this, identifier, command);
  }
}
