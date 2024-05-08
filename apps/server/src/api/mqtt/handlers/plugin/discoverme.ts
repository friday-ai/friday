import logger from "@friday-ai/logger";
import type { PluginAttributes } from "@friday-ai/shared";
import type Friday from "../../../../core/friday";

/*
 * @route('friday/master/plugin/discoverme')
 * @param('Object', 'payload', '{pluginName: string, plugin: PluginType}')
 */
export default async function discoverme(friday: Friday, payload: { pluginName: string; plugin: PluginAttributes }) {
  logger.info(`Plugin discoverme ${payload.pluginName}`);
  await friday.plugin.create(payload.plugin);
}
