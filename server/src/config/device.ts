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
  COLOR = 'color',
  COLDWARM = 'coldwarm',
  COLORTEMP = 'colortemp',
  WHITE = 'white',
  SATURATION = 'saturation',
  OPENCLOSE = 'openclose',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  INTENSITY = 'intensity',
  POWER = 'power',
  WATER = 'water',
  MOTION = 'motion',
}

export enum DevicesActionsType {
  TURN_ON = 'action.devices.commands.turn_on',
  TURN_OFF = 'action.devices.commands.turn_off',
  SET_BRIGHTNESS = 'action.devices.commands.set_brightness',
  COLOR = 'action.devices.commands.color',
  COLD = 'action.devices.commands.cold',
  WARM = 'action.devices.commands.warm',
  COLOR_TEMP = 'action.devices.commands.color_temp',
  WHITE = 'action.devices.commands.white',
  SATURATION = 'action.devices.commands.saturation',
  OPEN = 'action.devices.commands.open',
  CLOSE = 'action.devices.commands.close',
  SET_TEMPERATURE = 'action.devices.commands.set_temperature',
  SET_HUMIDITY = 'action.devices.commands.set_humidity',
  SET_POWER_CONSUMPTION = 'action.devices.commands.set_power_consumption',
  SET_INTENSITY_CONSUMPTION = 'action.devices.commands.set_intensity_consumption',
  SET_WATER_CONSUMPTION = 'action.devices.commands.set_water_consumption',
  SET_MOTION = 'action.devices.commands.set_motion',
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
