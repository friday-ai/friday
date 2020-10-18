import { Client } from 'mqtt';
import { glob } from 'glob';
import Friday from '../../core/friday';
import sendMessage from './mqtt.sendMessage';
import { TopicToSubscribe } from '../../utils/constants';
import Log from '../../utils/log';

const logger = new Log();

/**
 * Web socket manager
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient: Client;
  public sendMessage = sendMessage;
  public handleMessages = {};

  constructor(mqttClient: Client, friday: Friday) {
    this.MqttClient = mqttClient;
    this.friday = friday;
    glob
      .sync('**/*.ts', { cwd: `${__dirname}/handlers/` })
    // eslint-disable-next-line global-require,import/no-dynamic-require
      .map((filename) => ({ [filename]: require(`./handlers/${filename}`).default }))
      .forEach((a) => {
        // @ts-ignore
        // eslint-disable-next-line prefer-destructuring
        this.handleMessages[Object.entries(a)[0][0]] = Object.entries(a)[0][1];
      });
  }

  start() {
    this.MqttClient.on('connect', () => {
      logger.info('Connected on message broker');
      this.MqttClient.subscribe(Object.keys(TopicToSubscribe));
      this.MqttClient.on('message', (topic, message) => {
        logger.info(`Receive message on topic ${topic} (${message.toString()})`);
        const resourceMethod = this.checkTopic(topic);
        // @ts-ignore
        this.handleMessages[resourceMethod](message.toString());
      });
    });
  }

  private checkTopic = (topic: string) => {
    const list = topic.split('/');
    return `${list[list.length - 2]}/${list[list.length - 1]}.ts`;
  };
}
