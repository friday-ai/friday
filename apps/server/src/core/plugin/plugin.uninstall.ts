import logger from "@friday-ai/logger";
import type PluginClass from "./plugin";

/**
 * Uninstall a plugin.
 * @param {String} id - Id of plugin.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.plugin.uninstall('833e9fe3-f753-4b2e-8949-ca4684e4f886');
 * ````
 */
export default async function uninstall(this: PluginClass, id: string): Promise<void> {
  try {
    const plugin = await this.getById(id);
    await this.docker.remove(plugin.dockerId);
    return this.destroy(id);
  } catch (error) {
    if (error.message.includes("Container not found")) {
      logger.warning("Container not exist, removing plugin from database");
      return this.destroy(id);
    }

    throw error;
  }
}
