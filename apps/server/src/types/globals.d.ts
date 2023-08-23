/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { Server } from 'http';
import Friday from '../core/friday';
import MqttServer from '../api/mqtt';
import FakeBroker from '../../test/utils/mqttBroker';

declare global {
  var FRIDAY: Friday;
  var TEST_SERVER: Server;
  var MQTT_TEST_SERVER: MqttServer;
  var FAKE_BROKER: FakeBroker;
}

export {};
