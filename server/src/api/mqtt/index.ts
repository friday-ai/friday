/* eslint-disable global-require,import/no-dynamic-require */
import { Client } from 'mqtt';
import { glob as Glob } from 'glob';
import Friday from '../../core/friday';
import sendMessage from './mqtt.sendMessage';
import { TopicToSubscribe as Topics, TopicHeader } from '../../utils/constants';
import Log from '../../utils/log';
import { KVArr } from '../../utils/interfaces';

const logger = new Log();

/**
 * MQTT manager
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient: Client;
  public sendMessage = sendMessage;
  public handlers: KVArr<Function> = {};

  constructor(mqttClient: Client, friday: Friday) {
    this.MqttClient = mqttClient;
    this.friday = friday;

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
          this.MqttClient.subscribe(`${TopicHeader}${topic}`);
        });

      this.MqttClient.on('message', (topic, message) => {
        this.handleMessage(topic, message.toString());
      });
    });
  }

  handleMessage(topic: string, message: string) {
    const finalTopic = topic.replace(TopicHeader, '');

    if (Object.values(Topics).includes(finalTopic)) {
      logger.info(`Received message on topic ${topic} (${message})`);
      this.handlers[finalTopic](message);
    }
  }
}
