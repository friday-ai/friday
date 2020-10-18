import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function discoverme(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Plugin discoverme ${json.pluginName}`);
  this.friday.plugin.create(json.plugin);
}
