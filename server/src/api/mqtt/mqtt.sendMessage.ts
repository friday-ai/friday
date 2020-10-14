import MqttServer from './index';
import error, { BadParametersError, NotFoundError } from '../../utils/errors/coreError';
import Log from '../../utils/log';

const logger = new Log();

export default function sendMessage(this: MqttServer, topic: string, message: string) {
  try {
    const json = JSON.parse(message);
    switch (topic) {
      case 'friday/satellite/plugin/install':
        if (typeof json.plugin === 'undefined'
              || typeof json.version === 'undefined'
              || typeof json.satellite === 'undefined') {
          throw new BadParametersError({ name: 'Publish mqtt message', message: 'Incorrect params', metadata: message });
        }
        this.MqttClient.publish(topic, message);
        break;
      case 'friday/satellite/plugin/stop':
        if (typeof json.plugin === 'undefined'
              || typeof json.satellite === 'undefined') {
          throw new BadParametersError({ name: 'Publish mqtt message', message: 'Incorrect params', metadata: message });
        }
        this.MqttClient.publish(topic, message);
        break;
      case 'friday/satellite/plugin/restart':
        if (typeof json.plugin === 'undefined'
              || typeof json.satellite === 'undefined') {
          throw new BadParametersError({ name: 'Publish mqtt message', message: 'Incorrect params', metadata: message });
        }
        this.MqttClient.publish(topic, message);
        break;
      case 'friday/satellite/plugin/delete':
        if (typeof json.plugin === 'undefined'
              || typeof json.satellite === 'undefined') {
          throw new BadParametersError({ name: 'Publish mqtt message', message: 'Incorrect params', metadata: message });
        }
        this.MqttClient.publish(topic, message);
        break;
      case 'friday/satellite/plugin/exec':
        if (typeof json.plugin === 'undefined'
            || typeof json.satellite === 'undefined'
            || typeof json.device === 'undefined'
            || typeof json.status === 'undefined') {
          throw new BadParametersError({ name: 'Publish mqtt message', message: 'Incorrect params', metadata: message });
        }
        this.MqttClient.publish(topic, message);
        break;
      default:
        logger.error(`Friday can't published to this topic ${topic}`);
        throw new NotFoundError({ name: 'Publish mqtt message', message: `Friday can't published to this topic ${topic}`, metadata: topic });
    }
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { topic, message },
    });
  }
}
