import logger from '@friday-ai/logger';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/plugin/heartbeat')
 * @param('Object', 'payload', '{pluginId: string}')
 */
export default async function heartbeat(friday: Friday, payload: { pluginId: string }) {
  logger.info(`Plugin heartbeat ${payload.pluginId}`);
  await friday.plugin.heartbeat(payload.pluginId);
}
