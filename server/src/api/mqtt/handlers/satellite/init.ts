import Log from '../../../../utils/log';
import MqttServer from '../../index';
import SatelliteType from '../../../../core/satellite/satellite.interface';

const logger = new Log();

export default async function init(this: MqttServer, payload: { satelliteId: string, satellite: SatelliteType }) {
  logger.info(`Satellite init ${payload.satelliteId}`);
  await this.friday.satellite.update(payload.satelliteId, payload.satellite);
}
