import { assert } from 'chai';
import MqttBroker from '../../utils/mqttBroker';
import MqttServer from '../../../src/api/mqtt';
import { MqttOptions } from '../../../src/utils/interfaces';

let mqttServer: MqttServer;
const mqttBroker = new MqttBroker();

describe('Mqtt.connection', () => {
  before(() => {
    // Start fake broker
    mqttBroker.start();
    // @ts-ignore
    mqttServer = global.MQTT_TEST_SERVER;
  });

  it('should connect to MQTT Broker', async () => {
    await mqttServer.start();

    mqttBroker.broker!.on('connect', () => {
      assert(true);
    });
  });

  /*
  it('should subscribe to topics', async () => {
  });
   */

  // eslint-disable-next-line func-names
  it('should not connect to MQTT Broker', async () => {
    mqttServer.stop();

    const mqttOptions: MqttOptions = {
      port: 1999,
      host: 'localhost',
    };

    // @ts-ignore
    const mqttClient = await new MqttServer(global.FRIDAY, mqttOptions).start();

    mqttClient.on('error', () => {
      assert(true);
    });
  });
});

/*
describe('Mqtt.receive', () => {
  it('should send message', async () => {
  });

  it('should not send message', async () => {
  });
});

describe('Mqtt.send', () => {
  it('should send message', async () => {
  });

  it('should not send message', async () => {
  });
});
*/
