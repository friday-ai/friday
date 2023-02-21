export enum DevicesTypes {
  PHYSICAL = 'physical',
  VIRTUAL = 'virtual',
  SERVICE = 'service',
}

export enum DevicesClasses {
  LIGHT = 'light',
}

export enum DevicesCapabilities {
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
  LUMINOSITY = 'luminosity',
}

export enum DevicesActions {
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
  SET_LUMINOSITY = 'action.devices.commands.set_luminosity',
}

export type DeviceCommand = {
  action: DevicesActions;
  params: { value: boolean | string | number };
};

export type OnOffSettings = null;

export interface BrightnessSettings extends Record<string, number> {
  min: number;
  max: number;
  step: number;
}

export type DeviceCapabilitySettingsSchema = OnOffSettings | BrightnessSettings;

export type DeviceCapabilityRegisterAttributes = {
  defaultName: string;
  type: DevicesCapabilities;
  externalId?: string;
  settings?: DeviceCapabilitySettingsSchema;
};

export type DeviceRegisterAttributes = {
  defaultName: string;
  defaultManufacturer: string;
  defaultModel: string;
  type: DevicesTypes;
  viaDevice?: string;
  externalId?: string;
  pluginId: string;
  capabilities?: DeviceCapabilityRegisterAttributes[];
};
