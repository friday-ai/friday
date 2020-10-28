import Log from '../../../../utils/log';
import MqttServer from '../../index';

const logger = new Log();

export default async function heartbeat(this: MqttServer, payload: { pluginId: string }) {
  logger.info(`Plugin heartbeat ${payload.pluginId}`);
  await this.friday.plugin.heartbeat(payload.pluginId);
}
