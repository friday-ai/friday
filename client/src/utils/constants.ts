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

export const DEFAULT_COORDS: [number, number] = [48.8583, 2.2945];
