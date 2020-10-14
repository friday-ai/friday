import MqttServer from '.';
import Log from '../../utils/log';

const logger = new Log();

export default function handleMessage(this: MqttServer, topic: string, message: string) {
  const json = JSON.parse(message);
  logger.info(`Receive message on topic ${topic} (${message})`);
  switch (topic) {
    case 'friday/master/satelitte/heartbeat':
      // this.friday.satellite
      break;
    case 'friday/master/satelitte/discoverme':
      this.friday.satellite.create(json);
      break;
    case 'friday/master/plugin/heartbeat':
      // this.friday.plugin
      break;
    case 'friday/master/plugin/discoverme':
      this.friday.plugin.create(json);
      break;
    case 'friday/master/device/set':
      this.friday.device.create(json);
      break;
    case 'friday/master/device/delete':
      this.friday.device.destroy(json.id);
      break;
    case 'friday/master/state/set':
      this.friday.state.set(json);
      break;
    default:
      logger.error(`Friday is not subscribed to this topic ${topic}`);
      break;
  }
}
