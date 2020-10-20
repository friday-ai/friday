import MqttServer from './index';
import error, { BadParametersError } from '../../utils/errors/coreError';
import Log from '../../utils/log';
import { MqttSendOptions, MqttMessagePayload } from '../../utils/interfaces';
import { TopicHeaderPub, TopicsTypes } from '../../utils/constants';

const logger = new Log();
const DEFAULT_OPTIONS: MqttSendOptions = {
  sendAll: false,
};

export default function sendMessage(this: MqttServer, message: MqttMessagePayload, options?: MqttSendOptions) {
  try {
    if (typeof message.topic === 'undefined') {
      throw new BadParametersError({ name: 'Send mqtt message', message: 'Incorrect params topic', metadata: { message, options } });
    }
    if ((<any>Object).values(TopicsTypes).includes(message.topic)) {
      const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

      let finalTopic = `${TopicHeaderPub}/${message.topic}`;

      if (mergedOptions.sendAll === false && typeof message.receiver !== 'undefined') {
        finalTopic = `${TopicHeaderPub}${message.receiver}/${message.topic}`;
      } else if (mergedOptions.sendAll === false && typeof message.receiver === 'undefined') {
        throw new BadParametersError({ name: 'Send mqtt message', message: 'Incorrect params', metadata: { mergedOptions, message } });
      }

      logger.info(`Publish to ${finalTopic} (${message.message})`);
      this.MqttClient.publish(finalTopic, message.message);
    }
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { message, options },
    });
  }
}
