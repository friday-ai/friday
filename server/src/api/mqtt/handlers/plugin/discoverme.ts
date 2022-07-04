import logger from '../../../../utils/log';
import { PluginType } from '../../../../config/entities';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/plugin/discoverme')
 * @param('Object', 'payload', '{pluginName: string, plugin: PluginType}')
 */
export default async function discoverme(friday: Friday, payload: { pluginName: string, plugin: PluginType }) {
  logger.info(`Plugin discoverme ${payload.pluginName}`);
  await friday.plugin.create(payload.plugin);
}
