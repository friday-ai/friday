import Log from '../../../../utils/log';
import MqttServer from '../../index';
import PluginType from '../../../../core/plugin/plugin.interface';

const logger = new Log();

export default async function init(this: MqttServer, payload: { pluginId: string, plugin: PluginType}) {
  logger.info(`Plugin init ${payload.pluginId}`);
  await this.friday.plugin.update(payload.pluginId, payload.plugin);
}
