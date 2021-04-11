const DEVICE_TYPE_LIST = {
  ALARM: 'alarm',
  CAMERA: 'camera',
  COVER: 'cover',
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
  CAMERA: {
    IP: 'ip',
    USB: 'usb',
    RPI: 'RPI',
  },
  COVER: {
    AWNING: 'awning',
    BLIND: 'blind',
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
  OUTLET: {
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
    TEMPERATURE: 'temperature',
    HUMIDITY: 'humidity',
  },
  UNKNOWN: {
    UNKNOWN: 'unknown',
  },
};

const DEVICE_SUBTYPE_FEATURE_LIST = {
  ALARM: {
    CO2: {
      STATE: 'state',
      BATTERY: 'battery',
    },
    DOOR: {
      STATE: 'state',
      BATTERY: 'battery',
    },
    DOOR_LOCK: {
      STATE: 'state',
      BATTERY: 'battery',
    },
    WINDOW: {
      STATE: 'state',
      BATTERY: 'battery',
    },
    SMOKE: {
      STATE: 'state',
      BATTERY: 'battery',
    },
    MOTION: {
      MOVEMENT: 'movement',
      BATTERY: 'battery',
    },
    FLOOD: {
      STATE: 'state',
      BATTERY: 'battery',
    },
  },
  CAMERA: {
    IP: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      BATTERY: 'battery',
      IMAGE: 'image',
      MOVEMENT: 'movement',
      FACE_RECOGNITION: 'face-recognition',
    },
    USB: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      IMAGE: 'image',
      MOVEMENT: 'movement',
      FACE_RECOGNITION: 'face-recognition',
    },
    RPI: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      IMAGE: 'image',
      MOVEMENT: 'movement',
      FACE_RECOGNITION: 'face-recognition',
    },
  },
  COVER: {
    AWNING: {
      OPEN: 'open',
      CLOSE: 'close',
      STATE: 'state',
    },
    BLIND: {
      OPEN: 'open',
      CLOSE: 'close',
      STATE: 'state',
    },
  },
  LIGHT: {
    SIMPLE: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
    },
    DIMMABLE: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      DIMMABLE: 'dimmable',
    },
    RGB: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      DIMMABLE: 'dimmable',
      HUE: 'hue',
    },
    RGBW: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      DIMMABLE: 'dimmable',
      HUE: 'hue',
      WHITE: 'white',
    },
    RGBWW: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      DIMMABLE: 'dimmable',
      HUE: 'hue',
      WARM_WHITE: 'warm-white',
    },
    RGBWCCT: {
      POWER_OFF: 'power-off',
      POWER_ON: 'power-on',
      DIMMABLE: 'dimmable',
      HUE: 'hue',
      WARM_COLD_WHITE: 'warm-cold-white',
    },
  },
};
