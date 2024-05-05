import logger from "@friday-ai/logger";
import type { MqttOptions } from "@friday-ai/shared";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiLike from "chai-like";
import chaiThings from "chai-things";
import Server from "../src/api/app";
import { umzug } from "../src/config/database";
import Friday from "../src/core/friday";
import MqttBroker from "./utils/mqttBroker";
import { cleanDb, seedDb } from "./utils/seed";
import wait from "./utils/timer";

const port = Number.parseInt(process.env.SERVER_PORT || "3500", 10);
const mqttPort = Number.parseInt(process.env.MQTT_PORT || "1883", 10);
const mqttAddress = process.env.MQTT_ADDRESS || "localhost";
const fakeBroker = new MqttBroker();

const mqttOptions: MqttOptions = {
  port: mqttPort,
  host: mqttAddress,
};

chai.use(chaiLike);
chai.use(chaiThings);
chai.use(chaiAsPromised);

before(async function before() {
  this.timeout(16000);

  // Start fake broker
  fakeBroker.start();
  // Wait until the fake server was correctly started
  await wait(80);

  // Create Friday core object
  const friday = new Friday();

  // Start Friday core
  await friday.start();

  const server = new Server(port, friday, mqttOptions);

  global.FRIDAY = friday;
  global.TEST_SERVER = await server.start();
  global.MQTT_TEST_SERVER = server.mqttServer;
  global.FAKE_BROKER = fakeBroker;

  try {
    await cleanDb();
  } catch (e) {
    logger.warning("Impossible to clean database, ignoring error");
  }
  try {
    await umzug.up();
    await seedDb();
  } catch (e) {
    logger.error(e);
    throw e;
  }
});

beforeEach(async function beforeEach() {
  this.timeout(8000);

  // Clean database
  await cleanDb();

  // And seed it again
  await seedDb();
});
