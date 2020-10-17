import { Client } from 'mqtt';
import Friday from '../../core/friday';
import handleMessage from './mqtt.handleMessage';
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
  public handleMessage = handleMessage;
  public sendMessage = sendMessage;

  constructor(mqttClient: Client, friday: Friday) {
    this.MqttClient = mqttClient;
    this.friday = friday;
  }

  start() {
    this.MqttClient.on('connect', () => {
      logger.info('connect on brocker');
      this.MqttClient.subscribe(Object.keys(TopicToSubscribe));
      this.MqttClient.on('message', (topic, message) => {
        this.handleMessage(
          topic,
          message.toString(),
        );
      });
    });
  }
}
