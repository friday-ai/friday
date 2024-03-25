import logger from '@friday-ai/logger';
import { TopicHeaderSub, TopicToSubscribe as Topics } from '../../config/constants';

import error from '../../utils/decorators/error';
import MqttServer from './index';

export default function handleMessage(this: MqttServer, topic: string, message: string) {
  try {
    const finalTopic = topic.replace(TopicHeaderSub, '');

    if (Object.values(Topics).includes(finalTopic)) {
      logger.info(`Received message on topic ${topic} (${message})`);

      const handler = this.handlers[finalTopic];
      if (handler) {
        handler(this.friday, JSON.parse(message) as never);
      } else {
        logger.info(`Topic ${topic} unknown`);
      }
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
