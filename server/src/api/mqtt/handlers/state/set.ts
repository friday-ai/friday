import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function set(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`State set ${json.stateId} on ${json.deviceId}`);
  this.friday.state.set(json.state);
}
