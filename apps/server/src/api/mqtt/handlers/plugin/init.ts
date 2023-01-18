import { PluginAttributes } from '@friday/shared';
import logger from '@friday/logger';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/plugin/init')
 * @param('Object', 'payload', '{pluginId: string, plugin: PluginType}')
 */
export default async function init(friday: Friday, payload: { pluginId: string; plugin: PluginAttributes }) {
  logger.info(`Plugin init ${payload.pluginId}`);
  await friday.plugin.update(payload.pluginId, payload.plugin);
}
