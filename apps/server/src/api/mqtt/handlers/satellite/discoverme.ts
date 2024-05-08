import logger from "@friday-ai/logger";
import type { SatelliteAttributes } from "@friday-ai/shared";
import type Friday from "../../../../core/friday";

/*
 * @route('friday/master/satellite/discoverme')
 * @param('Object', 'payload', '{satelliteName: string, satellite: SatelliteType}')
 */
export default async function discoverme(friday: Friday, payload: { satelliteName: string; satellite: SatelliteAttributes }) {
  logger.info(`Satellite discover ${payload.satelliteName}`);
  await friday.satellite.create(payload.satellite);
}
