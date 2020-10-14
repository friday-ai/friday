import MqttServer from '.';
import Log from '../../utils/log';

const logger = new Log();

export default function handleMessage(this: MqttServer, topic: string, message: string) {
  const json = JSON.parse(message);
  logger.info(`Receive message on topic ${topic} (${message})`);
  switch (topic) {
    // @Todo Add topic
    case '':

      break;
    default:
      logger.error(`Friday is not subscribed to this topic ${topic}`);
      break;
  }
}
