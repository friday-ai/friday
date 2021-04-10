const DEVICE_TYPE_LIST = {
  ALARM: 'alarm',
  BATTERY: 'battery',
  CAMERA: 'camera',
  COVER: 'cover',
  ELECTRICITY_CONCUMPTION: 'electricity-concumption',
  LIGHT: 'light',
  MEDIA: 'media',
  NOTIFICATION: 'notification',
  OUTLET: 'outlet',
  SENSOR: 'sensor',
  SWITCH: 'switch',
  THERMOSTAT: 'thermostat',
  UNKNOWN: 'unknown',
};

const DEVICE_SUBTYPE_LIST = {
  ALARM: {
    CO2: 'co2',
    DOOR: 'door',
    DOOR_LOCK: 'door-lock',
    WINDOW: 'window',
    SMOKE: 'smoke',
    MOTION: 'motion',
    FLOOD: 'flood',
  },
  BATTERY: {
    ELECTRICITY_CONCUMPTION: 'electricity-consumption',
  },
  CAMERA: {
    IP: 'ip',
    USB: 'usb',
    RPI: 'RPI',
  },
  COVER: {
    AWNING: 'awning',
    BLING: 'blind',
  },
  ELECTRICITY_CONCUMPTION: {
    RANGE_EXTENDER: 'range-extender',
  },
  LIGHT: {
    DIMMABLE: 'dimmable',
    RGB: 'rgb',
    RGBW: 'rgbw',
  },
  MEDIA: {
    AUDIO: 'audio',
    CONSOLE: 'console',
    VIDEO: 'video',
  },
  OUTLET: {
    ELECTRICITY_CONCUMPTION: 'electricity-consumption',
    SIMPLE: 'simple',
  },
  SENSOR: {
    CO2: 'co2',
    CO: 'co',
    DUST: 'dust',
    GAZ: 'gaz',
    TEMPERATURE: 'temperature',
    HYGROMETRY: 'hygrometry',
    PRESSURE: 'pressure',
    LUMINANCE: 'luminance',
    WIND: 'wind',
    RAIN: 'rain',
    NOISE: 'noise',
    UV: 'uv',
    OTHER: 'other',
    TRACKER: 'tracker',
  },
  SWITCH: {
    SIMPLE: 'simple',
    MULTIPLE_CHOICE: 'multiple-choice',
  },
  THERMOSTAT: {
    ELECTRICITY_CONCUMPTION: 'electricity-concumption',
    TEMPERATURE: 'temperature',
    HUMIDITY: 'humidity',
  },
  UNKNOWN: {
    UNKNOWN: 'unknown',
  },
};
