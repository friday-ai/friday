import { TopicHeaderSub, TopicToSubscribe as Topics } from '../../utils/constants';
import error from '../../utils/errors/coreError';
import MqttServer from './index';
import Log from '../../utils/log';

const logger = new Log();

export default function handleMessage(this: MqttServer, topic: string, message: string) {
  try {
    const finalTopic = topic.replace(TopicHeaderSub, '');

    if (Object.values(Topics).includes(finalTopic)) {
      logger.info(`Received message on topic ${topic} (${message})`);
      this.handlers[finalTopic](JSON.parse(message));
    }
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { topic, message },
    });
  }
}
