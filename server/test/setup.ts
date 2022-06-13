import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import Server from '../src/api/app';
import Friday from '../src/core/friday';
import { cleanDb, seedDb } from './utils/seed';
import { umzug } from '../src/config/database';
import logger from '../src/utils/log';
import { MqttOptions } from '../src/utils/interfaces';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3500;
const mqttPort = parseInt(process.env.MQTT_PORT!, 10) || 1883;
const mqttAddress = process.env.MQTT_ADDRESS! || 'localhost';

const mqttOptions: MqttOptions = {
  port: mqttPort,
  host: mqttAddress,
};

chai.use(chaiLike);
chai.use(chaiThings);
chai.use(chaiAsPromised);

before(async function before() {
  this.timeout(16000);

  // Create Friday core object
  const friday = new Friday();

  // Start Friday core
  await friday.start();

  const server = new Server(port, friday, mqttOptions);

  // @ts-ignore
  global.FRIDAY = friday;
  // @ts-ignore
  global.TEST_SERVER = await server.start();
  // @ts-ignore
  global.MQTT_TEST_SERVER = server.mqttServer;

  try {
    await cleanDb();
  } catch (e) {
    logger.warning('Impossible to clean database, ignoring error');
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
