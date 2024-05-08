import type {
  DcstCreationAttributes,
  DeviceAttributes,
  DeviceCapabilityRegisterAttributes,
  DeviceCapabilitySettingsSchema,
  DeviceCommand,
  DeviceCreationAttributes,
  DeviceRegisterAttributes,
} from "@friday-ai/shared";

import { DeviceCreationKeys, type DevicesActions } from "@friday-ai/shared";

import DeviceModel from "../../models/device";
import BaseModel from "../../utils/database/model.base";
import { Catch } from "../../utils/decorators/error";
import type EventClass from "../../utils/event";

import exec from "./device.exec";
import getCapabilityById from "./device.getCapabilityById";
import register from "./device.register";
import setCapability from "./device.setCapability";
import setCapabilitySettings from "./device.setCapabilitySettings";
import setCapabilityState from "./device.setCapabilityState";

import capabilities from "./capabilities";

/**
 * Device
 */
export default class Device extends BaseModel<DeviceModel, DeviceAttributes, DeviceCreationAttributes> {
  public event: typeof EventClass;

  constructor(event: typeof EventClass) {
    super(DeviceModel, DeviceCreationKeys);
    this.event = event;

    for (const capability of Object.values(capabilities)) {
      for (const key of Object.keys(capability.options)) {
        for (const action of capability.options[key].actions) {
          // Dynamically create type of capability
          type capabilityType = Omit<typeof capability, "options">;
          const fn = capability[key as keyof capabilityType] as (...args: unknown[]) => void;

          this.event.on(action, (e) => fn.bind(this)(e));
        }
      }
    }
  }

  @Catch()
  async register(data: DeviceRegisterAttributes) {
    return register.call(this, data);
  }

  @Catch()
  async setCapability(deviceId: string, capability: DeviceCapabilityRegisterAttributes) {
    return setCapability.call(this, deviceId, capability);
  }

  @Catch()
  async getCapabilityById(id: string, scope = "") {
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
