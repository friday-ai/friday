/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require,import/no-dynamic-require */
import logger from '@friday-ai/logger';
import { MqttOptions } from '@friday-ai/shared';
import { glob as Glob } from 'glob';
import mqtt, { connect } from 'mqtt';
import { EventsType, TopicHeaderSub, TopicToSubscribe as Topics } from '../../config/constants';
import Friday from '../../core/friday';
import handleMessage from './mqtt.handleMessage';
import sendMessage from './mqtt.sendMessage';

// const env = process.env.NODE_ENV || 'production';

const defaultMqttOptions: MqttOptions = {
  port: 1883,
  host: process.env.MQTT_HOST || 'localhost',
  protocol: 'mqtt',
  reconnectPeriod: 5000,
};

/**
 * MQTT manager
 * @routePrefix('mqtt')
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient!: mqtt.MqttClient;
  public sendMessage = sendMessage;
  public handlers: Record<string, (context: Friday, payload: object) => null> = {};
  public handleMessage = handleMessage;
  public retryTimes = 0;

  constructor(friday: Friday) {
    this.friday = friday;
    this.friday.event.on(EventsType.MQTT_PUBLISH, (event) => this.sendMessage(event));
    this.friday.event.on(EventsType.MQTT_PUBLISH_ALL, (event) => this.sendMessage(event, { sendAll: true }));

    Glob.sync('**/*.{js,ts}', { cwd: `${__dirname}/handlers/` }).forEach((filename) => {
      const topic = filename.replace(/.js|.ts/gi, '');
      this.handlers[topic] = require(`./handlers/${filename}`).default;
    });
  }

  async start(mqttOptions?: MqttOptions) {
    const options = mqttOptions ? Object.assign(defaultMqttOptions, mqttOptions) : defaultMqttOptions;

    this.MqttClient = connect(options);

    this.MqttClient.once('connect', () => {
      this.friday.mqttSecret = options;
      logger.info('Connected on mqtt broker');

      logger.info("Subscribing to friday's topics... ");
      Object.keys(Topics)
        .filter((element) => Number.isNaN(Number(element)))
        .forEach((topic) => {
          this.MqttClient.subscribe(`${TopicHeaderSub}${topic}`);
        });

      this.MqttClient.on('message', (topic, message) => {
        this.handleMessage(topic, message.toString());
      });
    });

    this.MqttClient.on('error', (_error) => {
      logger.warning('Error while connecting to MQTT, trying reconnection');
      this.retryTimes += 1;
      // TODO: Send warning to front
      if (this.retryTimes >= 5) {
        this.stop();
        logger.warning('MQTT max reconection limit, stop retry');
      }
    });

    return this.MqttClient;
  }

  stop() {
    if (this.MqttClient) {
      this.MqttClient.end();
      this.MqttClient.removeAllListeners();
      this.retryTimes = 0;
    }
  }
}
