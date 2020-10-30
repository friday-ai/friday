/* eslint-disable global-require,import/no-dynamic-require */
import { Client, connect } from 'mqtt';
import { glob as Glob } from 'glob';
import Friday from '../../core/friday';
import sendMessage from './mqtt.sendMessage';
import handleMessage from './mqtt.handleMessage';
import {
  EventsType, TopicHeaderSub, TopicToSubscribe as Topics,
} from '../../utils/constants';
import Log from '../../utils/log';
import { KVArr, MqttOptions } from '../../utils/interfaces';

const logger = new Log();

const defaultConnect: MqttOptions = {
  port: 1883,
  keepalive: 0,
  host: 'localhost',
  protocol: 'mqtt',
};

/**
 * MQTT manager
 * @routePrefix('mqtt')
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient: Client;
  public sendMessage = sendMessage;
  public handlers: KVArr<Function> = {};
  public handleMessage = handleMessage;

  constructor(friday: Friday, mqttOptions?: MqttOptions) {
    const mqttConnect = mqttOptions || defaultConnect;
    this.MqttClient = connect(mqttConnect);
    this.friday = friday;
    this.friday.event.on(EventsType.MQTT_PUBLISH, (event) => this.sendMessage(event));
    this.friday.event.on(EventsType.MQTT_PUBLISH_ALL, (event) => this.sendMessage(event, { sendAll: true }));

    Glob
      .sync('**/*.ts', { cwd: `${__dirname}/handlers/` })
      .forEach((filename) => {
        const topic = filename.replace('.ts', '');
        this.handlers[topic] = require(`./handlers/${filename}`).default;
      });
  }

  start() {
    this.MqttClient.on('connect', () => {
      logger.info('Connected on mqtt broker');

      logger.info('Subscribing to friday\'s topics... ');
      Object.keys(Topics)
        .filter((element) => Number.isNaN(Number(element)))
        .forEach((topic) => {
          this.MqttClient.subscribe(`${TopicHeaderSub}${topic}`);
        });

      this.MqttClient.on('message', (topic, message) => {
        this.handleMessage(topic, message.toString());
      });

      this.MqttClient.on('end', () => {
        logger.info('Disconnection from mqtt broker');
      });

      this.MqttClient.on('error', (error) => {
        logger.error(error.message);
      });
    });
  }

  stop() {
    if (this.MqttClient.connected) {
      this.MqttClient.end(true);
    }
  }
}
