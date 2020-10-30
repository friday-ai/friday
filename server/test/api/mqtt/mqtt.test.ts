import { expect } from 'chai';
// import sinon from 'sinon';
import MqttBroker from '../../utils/mqttBroker';
import MqttServer from '../../../src/api/mqtt';
import { MqttOptions } from '../../../src/utils/interfaces';
// import { BaseCoreError } from '../../../src/utils/errors/coreError';

// const { assert } = sinon;
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
    expect(mqttBroker.isConnected).equal(true);
  });

  /*
  it('should subscribe to topics', async () => {
  });
   */

  // eslint-disable-next-line func-names
  it('should not connect to MQTT Broker', async function (done) {
    this.timeout(3000);
    mqttServer.stop();

    const mqttOptions: MqttOptions = {
      port: 1999,
      host: 'localhost',
    };

    // @ts-ignore
    const mqttClient = await new MqttServer(global.FRIDAY, mqttOptions).start();

    // const eventSpy = sinon.fake();
    // do something that should trigger the event
    mqttClient.on('error', () => {
      done();
    });
    /*
    mqttClient.on('error', () => {
      console.log('test');
      eventSpy();
    });

     */
    /*
    setTimeout(() => {
      done();
    }, 2500);
    assert.called(eventSpy);
    */

    // await assert.isRejected(promise, BaseCoreError);
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
