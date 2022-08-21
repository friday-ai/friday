enum DevicesType {
  PHYSICAL = 'physical',
  VIRTUAL = 'virtual',
  SERVICE = 'service',
}

enum DevicesClassesType {
  LIGHT = 'light',
}

enum DevicesCapabilityType {
  ONOFF = 'onoff',
  BRIGHTNESS = 'brightness',
}

export enum DevicesActionsType {
  TURN_ON = 'action.devices.commands.turn_on',
  TURN_OFF = 'action.devices.commands.turn_off',
  SET_BRIGHTNESS = 'action.devices.commands.set_brightness',
}

type OnOffSettings = null;

interface BrightnessSettings extends Record<string, any> {
  min: number;
  max: number;
  step: number;
}

export type DeviceCapabilitySettingsSchema = OnOffSettings | BrightnessSettings;

interface DeviceCapabilitySettingsRegisterType {
  type: DevicesCapabilityType;
  value: DeviceCapabilitySettingsSchema;
}

interface DeviceCapabilityRegisterType {
  defaultName: string;
  type: DevicesCapabilityType;
  settings?: DeviceCapabilitySettingsSchema;
}

interface DeviceRegisterType {
  defaultName: string;
  defaultManufacturer: string;
  defaultModel: string;
  type: DevicesType;
  viaDevice?: string;
  pluginSelector?: string;
  pluginId: string;
  capabilities?: DeviceCapabilityRegisterType[];
}

export {
  DevicesType,
  DevicesClassesType,
  DevicesCapabilityType,
  DeviceRegisterType,
  DeviceCapabilityRegisterType,
  DeviceCapabilitySettingsRegisterType,
};
