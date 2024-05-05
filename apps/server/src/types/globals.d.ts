import type { Server } from "node:http";
import type FakeBroker from "../../test/utils/mqttBroker";
import type MqttServer from "../api/mqtt";
import type Friday from "../core/friday";

declare global {
  var FRIDAY: Friday;
  var TEST_SERVER: Server;
  var MQTT_TEST_SERVER: MqttServer;
  var FAKE_BROKER: FakeBroker;
}
