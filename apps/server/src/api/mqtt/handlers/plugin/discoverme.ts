import { PluginAttributes } from '@friday/shared';
import logger from '@friday/logger';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/plugin/discoverme')
 * @param('Object', 'payload', '{pluginName: string, plugin: PluginType}')
 */
export default async function discoverme(friday: Friday, payload: { pluginName: string; plugin: PluginAttributes }) {
  logger.info(`Plugin discoverme ${payload.pluginName}`);
  await friday.plugin.create(payload.plugin);
}
