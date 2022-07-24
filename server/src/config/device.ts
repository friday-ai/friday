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
}

export enum DevicesActionsType {
  TURN_ON = 'action.devices.commands.turn_on',
  TURN_OFF = 'action.devices.commands.turn_off',
  SET_BRIGHTNESS = 'action.devices.commands.set_brightness',
}

interface DeviceCapabilitySettingsSchema {
  'onoff': {}
}

interface DeviceCapabilitySettingsRegisterType {
  type: DevicesCapabilityType;
  value: DeviceCapabilitySettingsSchema;
}

interface DeviceCapabilityRegisterType {
  defaultName: string;
  type: DevicesCapabilityType;
  settings?: DeviceCapabilitySettingsRegisterType;
}

interface DeviceRegisterType {
  defaultName: string;
  defaultManufacturer: string;
  defaultModel: string;
  type: DevicesType;
  deviceId?: string;
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
