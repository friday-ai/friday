import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(plugin: PluginType): Promise<PluginType> {
  try {
    const createdPlugin = await Plugin.create(plugin);
    let pluginToReturn = <PluginType>createdPlugin.get({ plain: true });
    return pluginToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
