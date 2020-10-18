import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function init(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Plugin init ${json.pluginId}`);
  this.friday.plugin.update(json.pluginId, json.plugin);
}
