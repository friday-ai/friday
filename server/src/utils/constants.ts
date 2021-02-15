export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  HABITANT = 'habitant',
  GUEST = 'guest',
}

export enum AvailableLanguages {
  EN = 'en',
  FR = 'fr',
}

export enum VariableOwner {
  USER = 'user',
  PLUGIN = 'plugin',
  SATELLITE = 'satellite',
}

export enum StateOwner {
  USER = 'user',
  HOUSE = 'house',
  ROOM = 'room',
  PLUGIN = 'plugin',
  SATELLITE = 'satellite',
  DEVICE = 'device',
}

export enum AvailableState {
  // User states
  USER_AS_SLEEP = 'user.as.sleep',
  USER_AT_WORK = 'user.at.work',
  USER_GO_TO_WORK = 'user.go.to.work',
  USER_AT_HOME = 'user.at.home',
  USER_IN_ROOM = 'user.in.room',
  USER_BACK_TO_HOME = 'user.back.to.home',
  USER_LEFT_HOME = 'user.left.home',
  // Plugin states
  PLUGIN_INSTALLED = 'plugin.installed',
  PLUGIN_ERRORED = 'plugin.errored',
  PLUGIN_WAITING_INSTALLATION = 'plugin.waiting.installation',
  PLUGIN_STOPPED = 'plugin.stopped',
  PLUGIN_RUNNING = 'plugin.running',
  PLUGIN_WAITING_CONFIGURATION = 'plugin.waiting.configuration',
  // House states
  HOUSE_EMPTY = 'house.empty',
  HOUSE_NOT_EMPTY = 'house.not.empty',
  // Room states
  ROOM_EMPTY = 'room.empty',
  ROOM_NOT_EMPTY = 'room.not.empty',
  // Satellite states
  SATELLITE_CONNECTED = 'satellite.connected',
  SATELLITE_DISCONNECTED = 'satellite.disconnected',
  SATELLITE_STANDBY = 'satellite.standby',
  SATELLITE_ERRORED = 'satellite.errored',
  SATELLITE_WAITING_CONFIGURATION = 'satellite.waiting.configuration',
  // Device states
  DEVICE_CONNECTED = 'device.connected',
  DEVICE_DISCONNECTED = 'device.disconnected',
  DEVICE_STANDBY = 'device.standby',
  DEVICE_ERRORED = 'device.errored',
  DEVICE_WAITING_CONFIGURATION = 'device.waiting.configuration',
}

export enum AvailableConditions {
  // User conditions
  USER_IS_AS_SLEEP = 'user.is.as.sleep',
  USER_IS_AS_AT_HOME = 'user.is.at.home',
  // Sun conditions
  SUNSET = 'sunset',
  SUNRISE = 'sunrise',
  // Device conditions
  DEVICE_VALUE = 'device.value',
  // Home conditions
  HOUSE_IS_EMPTY = 'house.is.empty',
}

export enum ActionsType {
  // Light actions
  LIGHT_TURN_ON = 'light.turn_on',
  LIGHT_TURN_OFF = 'light.turn_off',
  // State actions
  STATE_SET = 'state.set',
  // Scrip actions
  SCRIPT_START = 'script.start',
  // Notification actions
  NOTIFICATION_SEND = 'notification.send',
  // Music actions
  MUSIC_PLAY = 'music.play',
  MUSIC_PAUSE = 'music.pause',
  MUSIC_STOP = 'music.stop',
  MUSIC_NEXT = 'music.next',
  MUSIC_PREVIOUS = 'music.previous',
  // Time actions
  TIME_DELAY = 'time.delay',
  TIME_AT_DATE = 'time.at.date',
  // No action
  OTHER = 'other',
}

export enum EventsType {
  // State events
  STATES_PURGE = 'states.purge',
  STATE_SET = 'state.set',
  // System events
  SYSTEM_STARTED = 'system.started',
  SYSTEM_UPDATED = 'system.updated',
  SYSTEM_SHUTDOWN = 'system.shutdown',
  SYSTEM_CHECK_UPDATE = 'system.check_update',
  SYSTEM_BACKUP = 'system.backup',
  // Websocket events
  WEBSOCKET_SEND = 'websocket.send',
  WEBSOCKET_SEND_ALL = 'websocket.send.all',
  WEBSOCKET_SEND_ADMIN = 'websocket.send.admin',
  // Mqtt events
  MQTT_PUBLISH = 'mqtt.publish',
  MQTT_PUBLISH_ALL = 'mqtt.publish.all',
}

export enum WebsocketMessageTypes {
  // Authentication
  AUTHENTICATION = 'authenticate',
  // Device
  DEVICE_VALUE = 'device.value',
  // Mqtt
  MQTT_CONNECTED = 'mqtt.connected',
  MQTT_ERROR = 'mqtt.error',
  // Websocket
  MESSAGE_SEND = 'message.send',
  MESSAGE_SEND_ALL = 'message.send.all',
  MESSAGE_SEND_ADMIN = 'message.send.admin',
}

export enum MqttMessageTypes {
  // Mqtt
  MQTT_CONNECTED = 'mqtt.connected',
  MQTT_ERROR = 'mqtt.error',
  MESSAGE_SEND = 'message.send',
  MESSAGE_SEND_ALL = 'message.send.all',
}

export enum SystemVariablesNames {
  FRIDAY_VERSION = 'friday_version',
  HISTORY_STATE_IN_DAYS = 'history_state_in_days',
  NUMBER_OF_BACKUPS = 'number_of_backups',
}

// TODO = Create a Json file with all type of device available
export enum AvailableTypeOfDevice {
  LIGHT = 'light',
  SENSOR = 'sensor',
}

// TODO = Create a Json file with all sub type of device available
export enum AvailableSubTypeOfDevice {
  LIGHT_W = 'light_w',
  LIGHT_RGB = 'light_rgb',
  LIGHT_RGBW = 'light_rgbw',
  SENSOR_TEMPERATURE = 'sensor_temperature',
  SENSOR_HUMIDITY = 'sensor_humidity',
}

export const TopicHeaderSub = 'friday/master/';
export const TopicHeaderPub = 'friday/satellite/';

export enum TopicToSubscribe {
  'device/destroy',
  'device/set',
  'plugin/discoverme',
  'plugin/heartbeat',
  'plugin/init',
  'satellite/discoverme',
  'satellite/heartbeat',
  'satellite/init',
  'state/set',
}

export enum TopicsTypes {
  PLUGIN_DELETE = 'plugin/delete',
  PLUGIN_EXEC = 'plugin/exec',
  PLUGIN_INSTALL = 'plugin/install',
  PLUGIN_RESTART = 'plugin/restart',
  PLUGIN_STOP = 'plugin/stop',
}
