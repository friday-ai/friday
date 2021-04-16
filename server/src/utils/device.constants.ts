const DEVICE_SUBTYPE_LIST: { [key: string]: { [key: string]: string; } } = {
  ALARM: {
    CO2: 'co2',
    DOOR: 'door',
    DOOR_LOCK: 'door-lock',
    WINDOW: 'window',
    SMOKE: 'smoke',
    MOTION: 'motion',
    FLOOD: 'flood',
  },
  CAMERA: {
    IP: 'ip',
    USB: 'usb',
    RPI: 'RPI',
  },
  COVER: {
    // Auvent
    AWNING: 'awning',
    // Stores
    BLIND: 'blind',
    // Rideaux
    CURTAIN: 'curtain',
    // Porte
    DOOR: 'door',
    // Porte de garage
    GARAGE: 'garage',
    // Portail
    GATE: 'gate',
    // Volet
    SHUTTER: 'shutter',
    // Fenêtre
    WINDOW: 'window',
  },
  LIGHT: {
    SIMPLE: 'simple',
    DIMMABLE: 'dimmable',
    RGB: 'rgb',
    RGBW: 'rgbw',
    RGBWW: 'rgbww',
    RGBWCCT: 'rgbwcct',
  },
  MEDIA: {
    AUDIO: 'audio',
    CONSOLE: 'console',
    VIDEO: 'video',
  },
  // Prise
  OUTLET: {
    SIMPLE: 'simple',
    MULTIPLE: 'multiple',
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
    PUSH: 'push',
  },
  THERMOSTAT: {
    TEMPERATURE: 'temperature',
    HUMIDITY: 'humidity',
  },
  UNKNOWN: {
    UNKNOWN: 'unknown',
  },
};

const DEVICE_TYPE_COMMON_FEATURE: { [key: string]: { [key: string]: string; } } = {
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
    STATUS: 'status',
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

const DEVICE_SUBTYPE_FEATURE_LIST: { [key: string]: { [key: string]: { [key: string]: string; } } } = {
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
