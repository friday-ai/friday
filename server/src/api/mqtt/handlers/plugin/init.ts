import Log from '../../../../utils/log';
import MqttServer from '../../index';
import PluginType from '../../../../core/plugin/plugin.interface';

const logger = new Log();

/*
 * @route('friday/master/plugin/init')
 * @param('Object', 'payload', '{pluginId: string, plugin: PluginType}')
 */
export default async function init(this: MqttServer, payload: { pluginId: string, plugin: PluginType }) {
  logger.info(`Plugin init ${payload.pluginId}`);
  await this.friday.plugin.update(payload.pluginId, payload.plugin);
}
