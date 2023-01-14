/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { Server } from 'http';
import Friday from '../core/friday';
import MqttServer from '../api/mqtt';

declare global {
  var FRIDAY: Friday;
  var TEST_SERVER: Server;
  var MQTT_TEST_SERVER: MqttServer;
}

export {};
