import { expect } from 'chai';
import sinon from 'sinon';
import Friday from '../../../src/core/friday';
import MqttBroker from '../../utils/mqttBroker';
import MqttServer from '../../../src/api/mqtt';
import wait from '../../utils/timer';
import { MqttMessagePayload, MqttOptions } from '../../../src/utils/interfaces';
import {
  EventsType,
  MqttMessageTypes,
  TopicHeaderSub,
  TopicsTypes,
  TopicToSubscribe as Topics,
} from '../../../src/config/constants';

const fakeBroker = new MqttBroker();
const mqttPort = parseInt(process.env.MQTT_PORT!, 10) || 1884;
const mqttOptions: MqttOptions = {
  port: mqttPort,
  host: 'localhost',
};

let mqttClient: MqttServer;
let friday: Friday;

const fakeMsg: MqttMessagePayload = {
  message: 'this is a test ;)',
  topic: TopicsTypes.PLUGIN_EXEC,
  type: MqttMessageTypes.MESSAGE_SEND,
  sender: '',
  receiver: 'test',
};

describe('Mqtt.connection', () => {
  before(async () => {
    // @ts-ignore
    mqttClient = global.MQTT_TEST_SERVER;
    // @ts-ignore
    friday = global.FRIDAY;
    // Start fake broker
    fakeBroker.start();
    // Wait until the fake server was correctly started
    await wait(80);
  });

  it('should connect to MQTT Broker', async () => {
    const listener = sinon.spy();

    fakeBroker.on('connected', listener);
    await mqttClient.start(mqttOptions);
    await wait(40);

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

    await wait(30);
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

    fakeBroker.on('subscribe', (topic) => {
      topicsSubscribed.push(topic);
    });

    await mqttClient.start(mqttOptions);
    await wait(30);

    expect(topicsSubscribed).deep.equal(topicsToSubscribe);
  });
});

describe('Mqtt.publish', () => {
  it('should publish a message', async () => {
    let msgReceived = {};

    await mqttClient.start(mqttOptions);

    fakeBroker.on('message', (message) => {
      msgReceived = { message };
    });

    // Wait until subscribe messages passed
    await wait(30);
    friday.event.emit(EventsType.MQTT_PUBLISH, fakeMsg);
    await wait(30);

    expect(msgReceived).deep.equal({ message: 'this is a test ;)' });
  });

  it('should not send message', async () => {
    const spy = sinon.spy(mqttClient, 'sendMessage');
    await mqttClient.start(mqttOptions);

    const incorrectMsg: MqttMessagePayload = {
      message: 'this is a test ;)',
      topic: TopicsTypes.PLUGIN_EXEC,
      type: MqttMessageTypes.MESSAGE_SEND,
      sender: '',
    };

    try {
      // Wait until subscribe messages passed
      await wait(30);
      friday.event.emit(EventsType.MQTT_PUBLISH, incorrectMsg);
      await wait(30);
    } catch (e) {
      return;
    }

    expect(spy.callCount).equal(1);
    expect(spy.threw()).to.equal(true);
  });
});

describe('Mqtt.handleMessage', () => {
  it('should handle a message', async () => {
    const spy = sinon.spy(mqttClient, 'handleMessage');
    await mqttClient.start(mqttOptions);

    fakeBroker.client!.publish({
      cmd: 'publish',
      dup: false,
      qos: 2,
      retain: false,
      payload: Buffer.from('this is a test ;)'),
      topic: TopicsTypes.PLUGIN_EXEC,
    }, () => {});

    await wait(30);

    expect(spy.calledWith(TopicsTypes.PLUGIN_EXEC, 'this is a test ;)')).to.equal(true);
  });
});
