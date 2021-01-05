import { expect } from 'chai';
import sinon from 'sinon';
import MqttBroker from '../../utils/mqttBroker';
import MqttServer from '../../../src/api/mqtt';
import wait from '../../utils/timer';
import { MqttOptions } from '../../../src/utils/interfaces';
import { TopicHeaderSub, TopicToSubscribe as Topics } from '../../../src/utils/constants';

const broker = new MqttBroker();
const mqttPort = parseInt(process.env.MQTT_PORT!, 10) || 1884;
const mqttOptions: MqttOptions = {
  port: mqttPort,
  host: 'localhost',
};

let mqttClient: MqttServer;

describe('Mqtt.connection', () => {
  before(async () => {
    // @ts-ignore
    mqttClient = global.MQTT_TEST_SERVER;
    // Start fake broker
    broker.start();
  });

  it('should connect to MQTT Broker', async () => {
    const listener = sinon.spy();

    broker.on('connected', listener);
    await mqttClient.start(mqttOptions);
    await wait(20);

    expect(listener.called).equal(true);
  });

  it('should not connect to MQTT Broker', async () => {
    const listener = sinon.spy();
    const fakeMqttOptions: MqttOptions = {
      port: 1999,
      host: 'localhost',
    };

    const client = await mqttClient.start(fakeMqttOptions);
    client.on('error', listener);

    await wait(20);
    expect(listener.called).equal(true);
  });

  it('should subscribe to topics', async () => {
    const topicsSubscribed: Array<string> = [];
    const topicsToSubscribe: Array<string> = [];

    Object.keys(Topics)
      .filter((element) => Number.isNaN(Number(element)))
      .forEach((topic) => {
        topicsToSubscribe.push(`${TopicHeaderSub}${topic}`);
      });

    broker.on('subscribe', (topic) => {
      topicsSubscribed.push(topic);
    });

    await mqttClient.start(mqttOptions);
    await wait(20);

    expect(topicsSubscribed).deep.equal(topicsToSubscribe);
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
