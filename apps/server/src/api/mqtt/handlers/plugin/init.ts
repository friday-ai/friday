import logger from '../../../../utils/log';
import { PluginType } from '../../../../config/entities';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/plugin/init')
 * @param('Object', 'payload', '{pluginId: string, plugin: PluginType}')
 */
export default async function init(friday: Friday, payload: { pluginId: string, plugin: PluginType }) {
  logger.info(`Plugin init ${payload.pluginId}`);
  await friday.plugin.update(payload.pluginId, payload.plugin);
}
