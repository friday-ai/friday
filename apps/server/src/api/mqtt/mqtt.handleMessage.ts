import logger from '@friday/logger';
import { TopicHeaderSub, TopicToSubscribe as Topics } from '../../config/constants';

import MqttServer from './index';
import error from '../../utils/decorators/error';

export default function handleMessage(this: MqttServer, topic: string, message: string) {
  try {
    const finalTopic = topic.replace(TopicHeaderSub, '');

    if (Object.values(Topics).includes(finalTopic)) {
      logger.info(`Received message on topic ${topic} (${message})`);
      this.handlers[finalTopic](this.friday, JSON.parse(message));
    }
  } catch (e) {
    throw error({
      name: e.name,
      message: e.message,
      cause: e,
      metadata: { topic, message },
    });
  }
}
