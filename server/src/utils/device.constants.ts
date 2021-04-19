import { DeviceSubtypeFeatureList, DeviceSubtypeList, DeviceTypeCommonFeature } from './interfaces';

const DEVICE_SUBTYPE_LIST: DeviceSubtypeList = {
  ALARM: {
    CO2: 'CO2',
    DOOR: 'DOOR',
    DOOR_LOCK: 'DOOR_LOCK',
    WINDOW: 'WINDOW',
    SMOKE: 'SMOKE',
    MOTION: 'MOTION',
    FLOOD: 'FLOOD',
  },
  CAMERA: {
    IP: 'IP',
    USB: 'USB',
    RPI: 'RPI',
  },
  COVER: {
    // Auvent
    AWNING: 'AWNING',
    // Stores
    BLIND: 'BLIND',
    // Rideaux
    CURTAIN: 'CURTAIN',
    // Porte
    DOOR: 'DOOR',
    // Porte de garage
    GARAGE: 'GARAGE',
    // Portail
    GATE: 'GATE',
    // Volet
    SHUTTER: 'SHUTTER',
    // Fenêtre
    WINDOW: 'WINDOW',
  },
  LIGHT: {
    SIMPLE: 'SIMPLE',
    DIMMABLE: 'DIMMABLE',
    RGB: 'RGB',
    RGBW: 'RGBW',
    RGBWW: 'RGBWW',
    RGBWCCT: 'RGBWCCT',
  },
  MEDIA: {
    AUDIO: 'AUDIO',
    CONSOLE: 'CONSOLE',
    VIDEO: 'VIDEO',
  },
  // Prise
  OUTLET: {
    SIMPLE: 'SIMPLE',
    MULTIPLE: 'MULTIPLE',
  },
  SENSOR: {
    CO2: 'CO2',
    CO: 'CO',
    DUST: 'DUST',
    GAZ: 'GAZ',
    TEMPERATURE: 'TEMPERATURE',
    HYGROMETRY: 'HYGROMETRY',
    PRESSURE: 'PRESSURE',
    LUMINANCE: 'LUMINANCE',
    WIND: 'WIND',
    RAIN: 'RAIN',
    NOISE: 'NOISE',
    UV: 'UV',
    OTHER: 'OTHER',
    TRACKER: 'TRACKER',
  },
  SWITCH: {
    SIMPLE: 'SIMPLE',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    PUSH: 'PUSH',
  },
  THERMOSTAT: {
    TEMPERATURE: 'TEMPERATURE',
    HUMIDITY: 'HUMIDITY',
  },
  UNKNOWN: {
    UNKNOWN: 'UNKNOWN',
  },
};

const DEVICE_TYPE_COMMON_FEATURE: DeviceTypeCommonFeature = {
  ALARM: {
    STATE: 'state',
    BATTERY: 'battery',
  },
  CAMERA: {
    POWER_OFF: 'power-off',
    POWER_ON: 'power-on',
    IMAGE: 'image',
    MOVEMENT: 'movement',
    FACE_RECOGNITION: 'face-recognition',
  },
  COVER: {
    OPEN: 'open',
    CLOSE: 'close',
    STATE: 'state',
    STOP: 'stop',
  },
  LIGHT: {
    POWER_OFF: 'power-off',
    POWER_ON: 'power-on',
  },
  MEDIA: {
    STATE: 'state',
  },
  NOTIFICATION: {},
  OUTLET: {
    STATE: 'state',
    POWER_OFF: 'power-off',
    POWER_ON: 'power-on',
  },
  SENSOR: {
    STATE: 'state',
    BATTERY: 'battery',
  },
  SWITCH: {
    STATE: 'state',
  },
  THERMOSTAT: {
    BATTERY: 'battery',
    SETPOINT: 'setpoint',
    STATE: 'state',
    MODE: 'mode',
    PLANING: 'planing',
  },
  UNKNOWN: {
    UNKNOWN: 'unknown',
  },
};

const DEVICE_SUBTYPE_FEATURE_LIST: DeviceSubtypeFeatureList = {
  ALARM: {
    CO2: {},
    DOOR: {},
    DOOR_LOCK: {},
    WINDOW: {},
    SMOKE: {},
    MOTION: {},
    FLOOD: {},
  },
  CAMERA: {
    IP: {
      BATTERY: 'battery',
    },
    USB: {},
    RPI: {},
  },
  COVER: {
    AWNING: {},
    BLIND: {},
    CURTAIN: {},
    DOOR: {},
    GARAGE: {},
    GATE: {},
    SHUTTER: {},
    WINDOW: {},
  },
  LIGHT: {
    SIMPLE: {},
    DIMMABLE: {
      DIMMABLE: 'dimmable',
    },
    RGB: {
      DIMMABLE: 'dimmable',
      HUE: 'hue',
    },
    RGBW: {
      DIMMABLE: 'dimmable',
      HUE: 'hue',
      WHITE: 'white',
    },
    RGBWW: {
      DIMMABLE: 'dimmable',
      HUE: 'hue',
      WARM_WHITE: 'warm-white',
    },
    RGBWCCT: {
      DIMMABLE: 'dimmable',
      HUE: 'hue',
      WARM_COLD_WHITE: 'warm-cold-white',
    },
  },
  MEDIA: {
    AUDIO: {
      PLAY: 'play',
      PAUSE: 'pause',
      NEXT: 'next',
      FAST_FORWARD: 'fast-forward',
      PREVIOUS: 'previous',
      REWIND: 'rewind',
      TITLE: 'title',
      PLAYLIST: 'playlist',
      METADATA: 'metadata',
      VOLUME_UP: 'volume-up',
      VOLUME_DOWN: 'volume-down',
    },
    CONSOLE: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      LAUNCH_GAME: 'launch-game',
    },
    VIDEO: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      PLAY: 'play',
      PAUSE: 'pause',
      STOP: 'stop',
      RECORD: 'record',
      CHANNEL: 'channel',
      PUSH_BUTTON: 'push-button',
      METADATA: 'metadata',
      VOLUME_UP: 'volume-up',
      VOLUME_DOWN: 'volume-down',
    },
  },
  OUTLET: {
    SIMPLE: {},
    MULTIPLE: {
      SWITCH_OUTLET: 'switch-outlet',
    },
  },
  SENSOR: {
    CO2: {},
    CO: {},
    DUST: {},
    GAZ: {},
    TEMPERATURE: {},
    HYGROMETRY: {},
    PRESSURE: {},
    LUMINANCE: {},
    WIND: {},
    RAIN: {},
    NOISE: {},
    UV: {},
    OTHER: {},
    TRACKER: {},
  },
  SWITCH: {
    SIMPLE: {
      OPEN: 'open',
      CLOSE: 'close',
    },
    MULTIPLE_CHOICE: {
      OPEN: 'open',
      CLOSE: 'close',
    },
    PUSH: {
      PUSH: 'push',
    },
  },
  THERMOSTAT: {
    TEMPERATURE: {},
    HUMIDITY: {},
  },
  UNKNOWN: {
    UNKNOWN: {},
  },
};

export {
  DEVICE_SUBTYPE_FEATURE_LIST,
  DEVICE_SUBTYPE_LIST,
  DEVICE_TYPE_COMMON_FEATURE,
};
