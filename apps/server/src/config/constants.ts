export enum EventsType {
  // State events
  STATES_PURGE = "states.purge",
  STATE_SET = "state.set",
  // System events
  SYSTEM_STARTED = "system.started",
  SYSTEM_UPDATED = "system.updated",
  SYSTEM_SHUTDOWN = "system.shutdown",
  SYSTEM_CHECK_UPDATE = "system.check_update",
  SYSTEM_BACKUP = "system.backup",
  // Websocket events
  WEBSOCKET_SEND = "websocket.send",
  WEBSOCKET_SEND_ALL = "websocket.send.all",
  WEBSOCKET_SEND_ADMIN = "websocket.send.admin",
  // Mqtt events
  MQTT_PUBLISH = "mqtt.publish",
  MQTT_PUBLISH_ALL = "mqtt.publish.all",
}

export enum MqttMessageTypes {
  // Mqtt
  MQTT_CONNECTED = "mqtt.connected",
  MQTT_ERROR = "mqtt.error",
  MESSAGE_SEND = "message.send",
  MESSAGE_SEND_ALL = "message.send.all",
}

export const TopicHeaderSub = "friday/master/";
export const TopicHeaderPub = "friday/satellite/";

export enum TopicToSubscribe {
  "capability/state" = 8,
  "device/destroy" = 0,
  "device/register" = 1,
  "plugin/discoverme" = 2,
  "plugin/heartbeat" = 3,
  "plugin/init" = 4,
  "satellite/discoverme" = 5,
  "satellite/heartbeat" = 6,
  "satellite/init" = 7,
}

export enum TopicsTypes {
  PLUGIN_DELETE = "plugin/delete",
  PLUGIN_EXEC = "plugin/exec",
  PLUGIN_INSTALL = "plugin/install",
  PLUGIN_RESTART = "plugin/restart",
  PLUGIN_STOP = "plugin/stop",
}

export enum FridayMode {
  NOMINAL = "nominal",
  INIT = "initialization",
  CONFIG = "config",
  CONFIG_SATELLITE = "config.satellite",
}

export const SALT_KEY = "5a0240fc-e5a6-4293-b1d0-36f6e0c6c0ae";
