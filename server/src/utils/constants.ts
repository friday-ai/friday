
export enum UserRole {
  ADMIN = 'admin',
  HABITANT = 'habitant',
  GUEST = 'guest'
}

export enum AvailableLanguages {
  EN = 'en',
  FR = 'fr'
}

export enum VariableOwner {
  USER = 'user',
  PLUGIN = 'plugin',
  SATELLITE = 'satellite'
}

export enum StateOwner {
  USER = 'user',
  HOUSE = 'house',
  ROOM = 'room',
  PLUGIN = 'plugin',
  SATELLITE = 'satellite',
  DEVICE = 'device'
}

export interface GetOptions {
  scope?: string;
  take?: number;
  skip?: number;
}

// TODO = Create a Json file with all type of device available
export enum AvailableTypeOfDevice {
  LIGHT = 'light',
  SENSOR = 'sensor'
}

// TODO = Create a Json file with all sub type of device available
export enum AvailableSubTypeOfDevice {
  LIGHT_W = 'light_w',
  LIGHT_RGB = 'light_rgb',
  LIGHT_RGBW = 'light_rgbw',
  SENSOR_TEMPERATURE = 'sensor_temperature',
  SENSOR_HUMIDITY = 'sensor_humidity'
}
