
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

export enum AvailableState {
  // User's states
  USER_AS_SLEEP = 'user.as.sleep',
  USER_AT_WORK = 'user.at.work',
  USER_GO_TO_WORK = 'user.go.to.work',
  USER_AT_HOME = 'user.at.home',
  USER_IN_ROOM = 'user.in.room',
  USER_BACK_TO_HOME = 'user.back.to.home',
  USER_LEFT_HOME = 'user.left.home',
  // Plugin's states
  PLUGIN_INSTALLED = 'plugin.installed',
  PLUGIN_ERRORED = 'plugin.errored',
  PLUGIN_WAITING_INSTALLATION = 'plugin.waiting.installation',
  PLUGIN_STOPED = 'plugin.stoped',
  PLUGIN_RUNING = 'plugin.running',
  PLUGIN_WAITING_CONFIGURATION = 'plugin.waiting.configuration',
  // House's states
  HOUSE_EMTPY = 'house.empty',
  HOUSE_NOT_EMPTY = 'house.not.empty',
  // Room's states
  ROOM_EMTPY = 'room.empty',
  ROOM_NOT_EMPTY = 'room.not.empty',
  // Satellite's states
  SATELLITE_CONNECTED = 'satellite.connected',
  SATELLITE_DISCONNECTED = 'satellite.disconnected',
  SATELLITE_STANDBY = 'satellite.standby',
  SATELLITE_ERRORED = 'satellite.errored',
  SATELLITE_WAITING_CONFIGURATION = 'satellite.waiting.configuration',
  // Device's states
  DEVICE_CONNECTED = 'device.connected',
  DEVICE_DISCONNECTED = 'device.disconnected',
  DEVICE_STANDBY = 'device.standby',
  DEVICE_ERRORED = 'device.errored',
  DEVICE_WAITING_CONFIGURATION = 'device.waiting.configuration'
}

export enum AvailableConditions {
  // User's conditions
  USER_IS_AS_SLEEP = 'user.is.as.sleep',
  USER_IS_AS_AT_HOME = 'user.is.at.home',
  // Sun's conditions
  SUNSET = 'sunset',
  SUNRISE = 'sunrise',
  // Device's conditions
  DEVICE_VALUE = 'device.value',
  // Home's conditions
  HOUSE_IS_EMPTY = 'house.is.empty'
}

export enum ActionsType {
  // Light's actions
  LIGHT_TURN_ON = 'light.turn_on',
  LIGHT_TURN_OFF = 'light.turn_off',
  // State's actions
  STATE_SET = 'state.set',
  // Scrip's actions
  SCRIPT_START = 'script.start',
  // Notification's actions
  NOTIFICATION_SEND = 'notification.send',
  // Music's actions
  MUSIC_PLAY = 'music.play',
  MUSIC_PAUSE = 'music.pause',
  MUSIC_STOP = 'music.stop',
  MUSIC_NEXT = 'music.next',
  MUSIC_PREVIOUS = 'music.previous',
  // Time's actions
  TIME_DELAY = 'time.delay',
  TIME_AT_DATE = 'time.at.date',
  // No action
  OTHER = 'other'
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
