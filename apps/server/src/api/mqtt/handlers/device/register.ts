import logger from "@friday-ai/logger";
import type { DeviceCreationAttributes } from "@friday-ai/shared";
import type Friday from "../../../../core/friday";

/*
 * @route('friday/master/device/register')
 * @param('Object', 'payload', 'DeviceType')
 */
export default async function register(friday: Friday, payload: DeviceCreationAttributes) {
  logger.info(`Device ${payload.defaultName} registered`);
  await friday.device.register(payload);
}
