import Log from '../../../../utils/log';
import MqttServer from '../../index';

const logger = new Log();

/*
 * @route('friday/master/plugin/heartbeat')
 * @param('Object', 'payload', '{pluginId: string}')
 */
export default async function heartbeat(this: MqttServer, payload: { pluginId: string }) {
  logger.info(`Plugin heartbeat ${payload.pluginId}`);
  await this.friday.plugin.heartbeat(payload.pluginId);
}
