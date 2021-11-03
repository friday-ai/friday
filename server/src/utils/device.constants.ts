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
    BRIGHTNESS: 'BRIGHTNESS',
    RGB: 'RGB',
    RGBW: 'RGBW',
    RGBWW: 'RGBWW',
    RGBWCCT: 'RGBWCCT',
  },
  MEDIA: {
    AUDIO: 'AUDIO',
    CONSOLE: 'CONSOLE',
    IMAGE: 'IMAGE',
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
    GET_STATE: 'getState',
    SET_STATE: 'setState',
    GET_BATTERY: 'getBattery',
    SET_BATTERY: 'setBattery',
    GET_MODE: 'getMode',
    SET_MODE: 'setMode',
  },
  CAMERA: {
    POWER_OFF: 'powerOff',
    POWER_ON: 'powerOn',
    SET_URL: 'setUrl',
    GET_URL: 'getUrl',
    SET_MOVEMENT: 'setMovement',
    GET_MOVEMENT: 'getMovement',
    FACE_RECOGNITION: 'faceRecognition',
  },
  COVER: {
    OPEN: 'open',
    CLOSE: 'close',
    GET_STATE: 'getState',
    SET_STATE: 'setState',
    STOP: 'stop',
  },
  LIGHT: {
    POWER_OFF: 'powerOff',
    POWER_ON: 'powerOn',
  },
  MEDIA: {
    GET_STATE: 'getState',
    SET_STATE: 'setState',
  },
  NOTIFICATION: {},
  OUTLET: {
    GET_STATE: 'getState',
    SET_STATE: 'setState',
    POWER_OFF: 'powerOff',
    POWER_ON: 'powerOn',
  },
  SENSOR: {
    GET_STATE: 'getState',
    SET_STATE: 'setState',
    GET_BATTERY: 'getBattery',
    SET_BATTERY: 'setBattery',
  },
  SWITCH: {
    GET_STATE: 'getState',
    SET_STATE: 'setState',
  },
  THERMOSTAT: {
    GET_BATTERY: 'getBattery',
    SET_BATTERY: 'setBattery',
    GET_SETPOINT: 'getSetpoint',
    SET_SETPOINT: 'setSetpoint',
    GET_STATE: 'getState',
    SET_STATE: 'setState',
    GET_MODE: 'getMode',
    SET_MODE: 'setMode',
    GET_PLANING: 'getPlaning',
    SET_PLANING: 'setPlaning',
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
      GET_BATTERY: 'getBattery',
      SET_BATTERY: 'setBattery',
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
    BRIGHTNESS: {
      SET_BRIGHTNESS: 'setBrightness',
      GET_BRIGHTNESS: 'getBrightness',
    },
    RGB: {
      SET_BRIGHTNESS: 'setBrightness',
      GET_BRIGHTNESS: 'getBrightness',
      SET_HUE: 'setHue',
      GET_HUE: 'getHue',
    },
    RGBW: {
      SET_BRIGHTNESS: 'setBrightness',
      GET_BRIGHTNESS: 'getBrightness',
      SET_HUE: 'setHue',
      GET_HUE: 'getHue',
      WHITE: 'white',
    },
    RGBWW: {
      SET_BRIGHTNESS: 'setBrightness',
      GET_BRIGHTNESS: 'getBrightness',
      SET_HUE: 'setHue',
      GET_HUE: 'getHue',
      WARM_WHITE: 'warmWhite',
    },
    RGBWCCT: {
      SET_BRIGHTNESS: 'setBrightness',
      GET_BRIGHTNESS: 'getBrightness',
      SET_HUE: 'setHue',
      GET_HUE: 'getHue',
      GET_WARM_COLD_WHITE: 'getWarmColdWhite',
      SET_WARM_COLD_WHITE: 'setWarmColdWhite',
    },
  },
  MEDIA: {
    AUDIO: {
      PLAY: 'play',
      PAUSE: 'pause',
      NEXT: 'next',
      FAST_FORWARD: 'fastForward',
      PREVIOUS: 'previous',
      REWIND: 'rewind',
      TITLE: 'title',
      GET_PLAYLIST: 'getPlaylist',
      SET_PLAYLIST: 'setPlaylist',
      GET_METADATA: 'getMetadata',
      VOLUME_UP: 'volumeUP',
      VOLUME_DOWN: 'volumeDown',
    },
    CONSOLE: {
      POWER_OFF: 'powerOff',
      POWER_ON: 'powerOn',
      LAUNCH_GAME: 'launchGame',
    },
    IMAGE: {
      SET_URL: 'setUrl',
      GET_URL: 'getUrl',
    },
    VIDEO: {
      POWER_OFF: 'powerOff',
      POWER_ON: 'powerOn',
      PLAY: 'play',
      PAUSE: 'pause',
      STOP: 'stop',
      START_RECORD: 'startRecord',
      STOP_RECORD: 'stopRecord',
      GET_CHANNEL: 'getChannel',
      SET_CHANNEL: 'setChannel',
      PUSH_BUTTON: 'pushButton',
      GET_METADATA: 'getMetadata',
      VOLUME_UP: 'volumeUP',
      VOLUME_DOWN: 'volumeDown',
    },
  },
  OUTLET: {
    SIMPLE: {},
    MULTIPLE: {
      SWITCH_OUTLET: 'switchOutlet',
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
