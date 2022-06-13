import logger from '../../../../utils/log';
import MqttServer from '../../index';
import PluginType from '../../../../core/plugin/plugin.interface';

/*
 * @route('friday/master/plugin/discoverme')
 * @param('Object', 'payload', '{pluginName: string, plugin: PluginType}')
 */
export default async function discoverme(this: MqttServer, payload: { pluginName: string, plugin: PluginType }) {
  logger.info(`Plugin discoverme ${payload.pluginName}`);
  // await this.friday.plugin.create(payload.plugin);
}
