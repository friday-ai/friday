/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require,import/no-dynamic-require */
import { Client, connect } from 'mqtt';
import { glob as Glob } from 'glob';
import { MqttOptions } from '@friday/shared';
import Friday from '../../core/friday';
import sendMessage from './mqtt.sendMessage';
import handleMessage from './mqtt.handleMessage';
import { EventsType, TopicHeaderSub, TopicToSubscribe as Topics } from '../../config/constants';
import logger from '../../utils/log';

/**
 * MQTT manager
 * @routePrefix('mqtt')
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient!: Client;
  public sendMessage = sendMessage;
  public handlers: Record<string, (context: Friday, payload: object) => null> = {};
  public handleMessage = handleMessage;

  constructor(friday: Friday) {
    this.friday = friday;
    this.friday.event.on(EventsType.MQTT_PUBLISH, (event) => this.sendMessage(event));
    this.friday.event.on(EventsType.MQTT_PUBLISH_ALL, (event) => this.sendMessage(event, { sendAll: true }));

    Glob.sync('**/*.{js,ts}', { cwd: `${__dirname}/handlers/` }).forEach((filename) => {
      const topic = filename.replace(/.js|.ts/gi, '');
      this.handlers[topic] = require(`./handlers/${filename}`).default;
    });
  }

  async start(mqttOptions: MqttOptions) {
    this.MqttClient = connect(mqttOptions);
    this.MqttClient.on('connect', () => {
      this.friday.mqttSecret = mqttOptions;
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

    this.MqttClient.on('error', (error) => {
      logger.error(error.message);
    });

    return this.MqttClient;
  }

  stop() {
    if (this.MqttClient.connected) {
      this.MqttClient.end(true);
    }
  }
}
