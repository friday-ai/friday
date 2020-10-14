import { Client } from 'mqtt';
import Friday from '../../core/friday';
import handleMessage from './mqtt.handleMessage';

/**
 * Web socket manager
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient: Client;
  public handleMessage = handleMessage;

  constructor(mqttClient: Client, friday: Friday) {
    this.MqttClient = mqttClient;
    this.friday = friday;
  }

  start() {
    this.MqttClient.on('connect', () => {
      this.MqttClient.on('message', (topic, message) => {
        this.handleMessage(
          topic,
          message.toString(),
        );
      });
    });
  }
}
