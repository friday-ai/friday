import Friday from '../core/friday';
import Server from '../api/app';
import MqttServer from '../api/mqtt';

declare global {
  var FRIDAY: Friday;
  var TEST_SERVER: Server;
  var MQTT_TEST_SERVER: MqttServer;
}

export {};
